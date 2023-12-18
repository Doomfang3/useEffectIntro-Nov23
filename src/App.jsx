import { useEffect, useState } from 'react'

function App() {
  const [count, setCount] = useState(0)
  const [isChecked, setIsChecked] = useState(false)
  const [characters, setCharacters] = useState([])
  const [nextPage, setNextPage] = useState('https://rickandmortyapi.com/api/character')
  const [prevPage, setPrevPage] = useState()
  const [rickCounter, setRickCounter] = useState(0)

  const fetchData = async url => {
    try {
      const response = await fetch(url)
      console.log(response)
      if (response.ok) {
        const charactersData = await response.json()
        console.log(charactersData)
        setCharacters(charactersData.results)
        setNextPage(charactersData.info.next)
        if (charactersData.info.prev) {
          setPrevPage(charactersData.info.prev)
        } else {
          setPrevPage()
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    // console.log('Something happened')
  })

  useEffect(() => {
    console.log('Component mounted')
    fetchData(nextPage)
  }, [])

  useEffect(() => {
    console.log(`New count: ${count}`)
  }, [count])

  useEffect(() => {
    let tempRickCount = 0
    characters.forEach(currentCharacter => {
      if (currentCharacter.name.toLowerCase().includes('rick')) {
        tempRickCount += 1
      }
    })
    setRickCounter(tempRickCount)
  }, [characters])

  useEffect(() => {
    console.log('From the useEffect', { characters })
  }, [characters])

  return (
    <>
      <h1>Here's my app</h1>
      <button type='button' onClick={() => setCount(count + 1)}>
        {count}
      </button>
      <input
        type='checkbox'
        checked={isChecked}
        onChange={event => setIsChecked(event.target.checked)}
      />
      {prevPage && (
        <button type='button' onClick={() => fetchData(prevPage)}>
          Previous page
        </button>
      )}
      <button type='button' onClick={() => fetchData(nextPage)}>
        Next page
      </button>
      <p>Number of Ricks in this set: {rickCounter}</p>
      <ul>
        {characters.map(character => (
          <li key={character.id}>{character.name}</li>
        ))}
      </ul>
    </>
  )
}

export default App
