export const toLocaleDateFunc = date => {
  const createdAt = new Date(date)
  return createdAt.toLocaleString()
}
