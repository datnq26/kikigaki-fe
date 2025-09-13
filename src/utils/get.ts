const colors = ['#f0f0f0', '#dbe4ff', '#91a7ff', '#5c7cfa', '#364fc7']

export const getStreakColor = (val: number) => {
    if (val <= 0) return colors[0]
    if (val >= colors.length) return colors[colors.length - 1]
    return colors[val]
}
