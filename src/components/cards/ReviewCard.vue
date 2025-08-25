<script setup lang="ts">
const props = defineProps<{
    reviews: any[]
}>()
</script>

<template>
    <el-card
        v-for="r in props.reviews"
        :key="r.id"
        shadow="never"
        class="review-card"
    >
        <div class="review-header">
            <el-avatar :src="r.avatar" :size="40" />
            <div class="review-meta">
                <div class="review-name">{{ r.name }}</div>
                <div class="review-date">{{ r.date }}</div>
            </div>
            <div class="review-rate">
                <el-rate
                    v-model="r.rating"
                    disabled
                    size="small"
                    :colors="['#F59E0B', '#F59E0B', '#F59E0B']"
                />
                <span class="review-score">{{ r.rating.toFixed(1) }}</span>
            </div>
        </div>
        <div class="review-content">
            {{ r.content }}
        </div>
    </el-card>
</template>

<style scoped>
.review-card {
    border: 1px solid #e5e7eb;
    border-radius: 12px;
}
.review-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 8px;
}
.review-meta {
    flex: 1;
}
.review-name {
    font-weight: 600;
    color: #111827;
}
.review-date {
    font-size: 12px;
    color: #6b7280;
}
.review-rate {
    display: flex;
    align-items: center;
    gap: 6px;
}
.review-score {
    font-size: 12px;
    color: #111827;
}
.review-content {
    font-size: 14px;
    color: #111827;
    line-height: 22px;
}
</style>
