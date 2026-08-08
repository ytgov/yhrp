<template>
  <div class="designation-content">
    <div
      v-for="(designation, index) in designations"
      :key="index"
      class="designation-item mb-4"
    >
      <div class="designation-level text-subtitle-1 font-weight-bold mb-2">
        {{ designation.level }}
      </div>

      <div class="designation-details">
        <div class="detail-row">
          <span class="detail-label">Date:</span>
          <span class="detail-value">{{ designation.date }}</span>
        </div>

        <div class="detail-row">
          <span class="detail-label">Bylaw:</span>
          <span class="detail-value">{{ designation.bylaw }}</span>
        </div>

        <div v-if="designation.reasons.length > 0" class="reasons-section mt-3">
          <div class="detail-label mb-2">Reasons:</div>
          <ul class="reasons-list">
            <li
              v-for="(reason, rIndex) in designation.reasons"
              :key="rIndex"
              class="reason-item"
            >
              {{ reason }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlaceDesignation",
  props: {
    designations: {
      type: Array,
      required: true,
      validator: (value) => {
        return value.every(
          (designation) =>
            designation.level &&
            typeof designation.level === "string" &&
            Array.isArray(designation.reasons)
        );
      },
    },
  },
};
</script>

<style scoped>
.designation-item {
  background-color: #f5f5f5;
  border-radius: 4px;
  padding: 16px;
}

.detail-row {
  display: flex;
  margin-bottom: 8px;
}

.detail-label {
  font-weight: 500;
  min-width: 80px;
  color: #666;
}

.detail-value {
  color: #333;
}

.reasons-list {
  list-style-type: disc;
  padding-left: 24px;
  margin: 0;
}

.reason-item {
  margin-bottom: 4px;
  color: #333;
}

@media (max-width: 600px) {
  .designation-item {
    padding: 12px;
  }

  .detail-row {
    flex-direction: column;
  }

  .detail-label {
    margin-bottom: 4px;
  }
}
</style>
