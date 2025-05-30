<template>
  <v-btn class="black--text mx-1" @click="exportPDF">
    <v-icon class="mr-1">mdi-printer</v-icon>
    Print
  </v-btn>
</template>

<script>
import jsPDF from "jspdf";
import "jspdf-autotable";
//import html2canvas from "html2canvas"
import _ from "lodash";
export default {
  name: "PrintButton",
  props: {
    name: {
      type: String,
      required: true,
    },
    data: {
      type: Object,
      required: true,
      validator: (value) => {
        return typeof value === "object" && value !== null;
      },
    },
  },
  components: {},
  data: () => ({
    doc: null,
    sections: [{ name: "General", print: false }],
    toPrint: {},
    textpos: 0,
  }),

  methods: {
    mapData() {
      let props = Object.getOwnPropertyNames(this.data);

      this.toPrint.general = _.pickBy(this.data, (value, key) =>
        _.includes(props, key)
      );
    },
    exportPDF() {
      this.mapData();

      this.doc = new jsPDF("p", "pt");
      this.doc.text(`Place: ${this.name}`, 40, 40);
      this.textpos = 70;
      //let sections = Object.keys(this.toPrint);

      this.printGeneral();
      // if (this.selectedImage) this.printPhoto();

      this.doc.save(`Place_${this.name}.pdf`);
    },
    printGeneral() {
      for (const key of Object.keys(this.toPrint.general)) {
        this.addTitle(key);
        this.addText(`${this.toPrint.general[key]}`);
      }
    },
    addText(text) {
      let rText = "Empty";
      if (!text.includes("null")) {
        rText = text;
      }
      let strArr = this.doc.splitTextToSize(rText, 550);
      this.doc.setFontSize(9);

      for (let i = 0; i < strArr.length; i++) {
        this.doc.text(strArr[i], 50, this.textpos);
        this.changePos(12);
      }
      this.changePos(8);
    },
    addTitle(title) {
      this.doc.setFontSize(10);
      this.doc.text(title, 40, this.textpos);
      this.textpos += 20;
    },
    changePos(val) {
      if (this.textpos + val >= 790) {
        this.doc.addPage();
        this.textpos = 50;
      } else {
        this.textpos += val;
      }
    },
  },
  watch: {
    textpos(newVal) {
      if (newVal >= 800) this.doc.addPage();
    },
  },
};
</script>
