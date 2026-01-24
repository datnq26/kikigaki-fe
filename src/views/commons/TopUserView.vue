<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { ElNotification } from 'element-plus'
import {
    Trophy,
    Medal,
    ArrowUp,
    ArrowDown,
    Coin,
    CaretTop,
    CaretBottom,
} from '@element-plus/icons-vue'
import UserService from '@/services/user'
import { LeaderboardUser } from '@/interfaces/user'
import { BASE_IMAGE_URL } from '@/constants/image'
import { useRouter } from 'vue-router'

const router = useRouter()
const loading = ref(false)
const topUsers = ref<LeaderboardUser[]>([])
// Store all leaderboard users (excluding top 3)
const allLeaderboardData = ref<LeaderboardUser[]>([])
// Displayed leaderboard users (paginated)
const leaderboard = ref<LeaderboardUser[]>([])

const currentPage = ref(1)
const pageSize = 10
const totalCount = ref(0)
const sortBy = ref<'points' | 'lessons' | 'time'>('points')
const sortOrder = ref<'asc' | 'desc'>('desc')

const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
}

const processLeaderboardData = () => {
    let data = [...allLeaderboardData.value]

    // Sort
    data.sort((a, b) => {
        let valA, valB
        if (sortBy.value === 'points') {
            valA = a.points
            valB = b.points
        } else if (sortBy.value === 'lessons') {
            valA = a.lessons_completed
            valB = b.lessons_completed
        } else {
            valA = a.time_spent_minutes
            valB = b.time_spent_minutes
        }

        if (sortOrder.value === 'asc') {
            return valA - valB
        } else {
            return valB - valA
        }
    })

    // Update total count
    totalCount.value = data.length

    // Paginate
    const start = (currentPage.value - 1) * pageSize
    const end = start + pageSize
    leaderboard.value = data.slice(start, end)
}

const fetchTopUsers = async () => {
    loading.value = true
    try {
        // Fetch a large number of users to handle client-side
        const response = await UserService.getTopUsers({ limit: 100 })
        if (response.status === 200) {
            const rawUsers = response.data

            // Map raw API response to LeaderboardUser interface
            // API returns: point, total_lessons, total_study_time_minutes, avatar (full url)
            const mappedUsers: LeaderboardUser[] = rawUsers.map(
                (u: any, index: number) => ({
                    id: u.id,
                    username: u.username,
                    first_name: u.first_name,
                    last_name: u.last_name,
                    avatar: u.avatar,
                    points: u.point || 0,
                    lessons_completed: u.total_lessons || 0,
                    time_spent_minutes: u.total_study_time_minutes || 0,
                    rank: index + 1,
                })
            )

            // Top 3 for the cards
            topUsers.value = mappedUsers.slice(0, 3)

            // Rest for the table
            allLeaderboardData.value = mappedUsers.slice(3)

            // Initial process
            processLeaderboardData()
        }
    } catch (error) {
        ElNotification({
            title: 'Error',
            message: 'Failed to load user data',
            type: 'error',
        })
    } finally {
        loading.value = false
    }
}

const handlePageChange = (page: number) => {
    currentPage.value = page
    processLeaderboardData()
}

const handleSort = (column: 'points' | 'lessons' | 'time') => {
    if (sortBy.value === column) {
        sortOrder.value = sortOrder.value === 'desc' ? 'asc' : 'desc'
    } else {
        sortBy.value = column
        sortOrder.value = 'desc'
    }
    // Reset to first page on sort change
    currentPage.value = 1
    processLeaderboardData()
}

const getRankIcon = (rank: number) => {
    // Icons can be customized here if needed, but for the design we might just use colors/images
    if (rank === 1) return Trophy // Placeholder, design usually has custom crowns
    return Medal
}

const getRankColor = (rank: number) => {
    if (rank === 1) return '#FFD700'
    if (rank === 2) return '#C0C0C0'
    if (rank === 3) return '#CD7F32'
    return '#6b7280'
}

const getAvatarUrl = (avatarPath: string) => {
    if (!avatarPath) return ''
    if (avatarPath.startsWith('http')) return avatarPath
    return `${BASE_IMAGE_URL}${avatarPath}`
}

const viewProfile = (userId: number) => {
    router.push(`/profile/${userId}`)
}

onMounted(() => {
    fetchTopUsers()
})
</script>

<template>
    <div class="page-container">
        <h2 class="page-title">KikiGaki Community</h2>

        <!-- Top Learners Section -->
        <div class="top-learners-container">
            <h3 class="section-title">Top Learners: The Elite Circle</h3>
            <div class="top-learners-grid">
                <!-- Reorder logic: 2, 1, 3 for visual pyramid effect if desired, but user image shows 1, 2, 3 left to right? 
                     Actually usually it's 2-1-3. Checking user image:
                     It shows Rank 1 on left? No, usually 1 is center.
                     Wait, user image shows: 2 (Left) - 1 (Center) - 3 (Right)?
                     Actually the image shows: Rank 1 (Left?), Rank 2 (Center?), Rank 3 (Right?)
                     Let's check the ranks in the image.
                     Left: Rank 1 (KaitoSan). Center: Rank 2 (SakuraLearn). Right: Rank 3 (ZenMaster).
                     Wait, KaitoSan is Rank 1. SakuraLearn is Rank 2. ZenMaster is Rank 3.
                     So it is 1 - 2 - 3 order left to right.
                     I will render them in order 1, 2, 3.
                -->
                <div
                    v-for="(user, index) in topUsers"
                    :key="user.id"
                    class="top-learner-card"
                    :class="`rank-${user.rank}`"
                >
                    <!-- Rank Crown/Icon Overlay could go here if we had SVGs -->
                    <div class="crown-icon" v-if="user.rank === 1">
                        <el-icon :size="32" color="#FFD700"><Trophy /></el-icon>
                    </div>

                    <div class="learner-avatar">
                        <el-image
                            :src="getAvatarUrl(user.avatar)"
                            fit="cover"
                            class="avatar-img"
                        />
                    </div>

                    <div class="learner-info">
                        <h4 class="learner-name">{{ user.username }}</h4>
                        <p class="learner-rank">
                            Rank:
                            <span
                                :style="{
                                    color: getRankColor(user.rank),
                                    fontWeight: 'bold',
                                }"
                                >{{ user.rank }}</span
                            >
                        </p>
                        <div class="learner-points">
                            <span>{{ user.points.toLocaleString() }}</span>
                            <!-- Using a coin-like icon -->
                            <el-icon class="points-icon"><Coin /></el-icon>
                        </div>
                        <div
                            class="view-profile-link"
                            @click="viewProfile(user.id)"
                        >
                            View Profile
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Global Leaderboard Section -->
        <div class="leaderboard-container">
            <h3 class="leaderboard-title">Global Leaderboard</h3>
            <el-table
                v-loading="loading"
                :data="leaderboard"
                class="leaderboard-table"
                :header-cell-style="{ color: '#6b7280', fontWeight: '500' }"
            >
                <el-table-column label="Rank" width="80" align="center">
                    <template #default="{ row }">
                        <span
                            class="rank-number"
                            :class="{ 'top-rank': row.rank <= 3 }"
                            >{{ row.rank }}</span
                        >
                    </template>
                </el-table-column>

                <el-table-column label="User" min-width="200">
                    <template #default="{ row }">
                        <div class="user-cell">
                            <el-image
                                :src="getAvatarUrl(row.avatar)"
                                fit="cover"
                                class="user-avatar"
                            />
                            <span class="user-name">{{ row.username }}</span>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column
                    label="Points"
                    width="150"
                    sortable-method="custom"
                >
                    <template #header>
                        <div
                            class="sortable-header"
                            @click="handleSort('points')"
                        >
                            Points
                            <span class="sort-icon" v-if="sortBy === 'points'">
                                <el-icon v-if="sortOrder === 'asc'"
                                    ><CaretTop
                                /></el-icon>
                                <el-icon v-else><CaretBottom /></el-icon>
                            </span>
                        </div>
                    </template>
                    <template #default="{ row }">
                        <span class="table-points">{{
                            row.points.toLocaleString()
                        }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="Lessons" width="120">
                    <template #header>
                        <div
                            class="sortable-header"
                            @click="handleSort('lessons')"
                        >
                            Lessons
                            <span class="sort-icon" v-if="sortBy === 'lessons'">
                                <el-icon v-if="sortOrder === 'asc'"
                                    ><CaretTop
                                /></el-icon>
                                <el-icon v-else><CaretBottom /></el-icon>
                            </span>
                        </div>
                    </template>
                    <template #default="{ row }">
                        {{ row.lessons_completed }}
                    </template>
                </el-table-column>

                <el-table-column label="Time Spent" width="150">
                    <template #header>
                        <div
                            class="sortable-header"
                            @click="handleSort('time')"
                        >
                            Time Spent
                            <span class="sort-icon" v-if="sortBy === 'time'">
                                <el-icon v-if="sortOrder === 'asc'"
                                    ><CaretTop
                                /></el-icon>
                                <el-icon v-else><CaretBottom /></el-icon>
                            </span>
                        </div>
                    </template>
                    <template #default="{ row }">
                        {{ formatTime(row.time_spent_minutes) }}
                    </template>
                </el-table-column>
            </el-table>

            <div class="pagination-wrapper">
                <el-pagination
                    v-model:current-page="currentPage"
                    :page-size="pageSize"
                    :total="totalCount"
                    layout="prev, pager, next"
                    @current-change="handlePageChange"
                    background
                />
            </div>
        </div>
    </div>
</template>

<style scoped>
.page-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 24px;
    background-color: #ffffff; /* Page background white? Or maybe light gray to show cards? Design implies white page with colored containers. */
}

.page-title {
    font-size: 28px;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 24px;
}

/* Top Learners Section */
.top-learners-container {
    background: linear-gradient(
        180deg,
        #f3e5f5 0%,
        #fce4ec 100%
    ); /* Light Purple/Pink Gradient */
    border-radius: 20px;
    padding: 32px;
    margin-bottom: 40px;
    text-align: center;
}

.section-title {
    font-size: 24px;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 32px;
}

.top-learners-grid {
    display: flex;
    justify-content: center;
    gap: 32px;
}

.top-learner-card {
    background: #ffffff;
    border-radius: 16px;
    padding: 32px 24px;
    width: 100%;
    max-width: 280px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    transition: transform 0.3s ease;
}

.top-learner-card:hover {
    transform: translateY(-5px);
}

.crown-icon {
    position: absolute;
    top: -16px;
    left: 50%;
    transform: translateX(-50%);
    background: white;
    border-radius: 50%;
    padding: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
}

.learner-avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    margin-bottom: 16px;
    border: 3px solid #fff; /* Optional border */
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.avatar-img {
    width: 100%;
    height: 100%;
}

.learner-info {
    text-align: center;
}

.learner-name {
    font-size: 20px;
    font-weight: 700;
    color: #1a1a1a;
    margin: 0 0 8px 0;
}

.learner-rank {
    font-size: 14px;
    color: #6b7280;
    margin: 0 0 12px 0;
}

.learner-points {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    font-size: 20px;
    font-weight: 700;
    color: #ffb300; /* Goldish color */
    margin-bottom: 16px;
}

.points-icon {
    color: #7986cb; /* Light Blue-ish for the C icon in design? Or just keep it gold? */
    /* Design shows numbers in gold/orange and a blue C icon */
    background: #e8eaf6;
    border-radius: 50%;
    padding: 2px;
    color: #5c6bc0;
}

.view-profile-link {
    font-size: 14px;
    color: #6b7280;
    cursor: pointer;
    transition: color 0.2s;
}

.view-profile-link:hover {
    color: #1a1a1a;
    text-decoration: underline;
}

/* Leaderboard Section */
.leaderboard-container {
    background: #ffffff;
    border-radius: 20px;
    padding: 32px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.04);
    border: 1px solid #f3f4f6;
    overflow-x: auto; /* Ensure horizontal scroll if needed */
}

.leaderboard-title {
    font-size: 20px;
    font-weight: 700;
    text-align: center;
    margin-bottom: 24px;
    color: #1a1a1a;
}

.leaderboard-table {
    /* Element Plus table overrides */
    --el-table-header-bg-color: #ffffff;
    --el-table-row-hover-bg-color: #f9fafb;
    border-bottom: none;
    width: 100%;
}

:deep(.el-table__inner-wrapper::before) {
    display: none; /* Hide bottom border */
}

.rank-number {
    font-weight: 700;
    color: #4caf50; /* Green for rank */
    font-size: 16px;
}

.rank-number.top-rank {
    /* In case top users are in table, but we split them out */
}

.user-cell {
    display: flex;
    align-items: center;
    gap: 12px;
}

.user-avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
}

.user-name {
    font-weight: 600;
    color: #1a1a1a;
}

.table-points {
    font-weight: 600;
    color: #1a1a1a;
}

.sortable-header {
    display: flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
    user-select: none;
    transition: color 0.2s;
}

.sortable-header:hover {
    color: #1a1a1a;
}

.sort-icon {
    display: flex;
    flex-direction: column;
    height: 20px;
    justify-content: center;
}

.pagination-wrapper {
    display: flex;
    justify-content: center;
    margin-top: 32px;
}

@media (max-width: 768px) {
    .top-learners-grid {
        flex-direction: column;
        align-items: center;
        gap: 24px;
    }

    .top-learner-card {
        max-width: 100%; /* Take full width on mobile up to container padding */
        width: 100%;
    }

    .page-container {
        padding: 16px;
    }

    .leaderboard-container {
        padding: 16px;
    }

    .section-title {
        font-size: 20px;
    }

    .page-title {
        font-size: 24px;
    }
}
</style>
