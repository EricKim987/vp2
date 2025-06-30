const base_url = "https://www.themealdb.com/api/json/v1/1"

export async function getCategories() {
  const response = await fetch(`${base_url}/categories.php`)
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`)
  }
  const data = await response.json()
  console.log(data)
  return data
}