import { useEffect, useState } from "react"

import { Card, FormField, Loader } from "../components"

//* RENDER CARD COMPONENT *//
const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return data.map((post) => <Card key={post._id} {...post} />)
  }

  return (
    <h2 className="mt-5 text-xl font-[500] uppercase text-[#6469ff]">
      {title}
    </h2>
  )
}

const Home = () => {
  const [loading, setLoading] = useState(false)
  const [allPosts, setAllPosts] = useState(null)

  const [searchText, setSearchText] = useState("")
  const [searchTimeout, setSearchTimeout] = useState(null)
  const [searchedResult, setSearchedResult] = useState(null)

  const fetchPosts = async () => {
    setLoading(true)

    try {
      const response = await fetch("http://localhost:8080/api/v1/post", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (response.ok) {
        const result = await response.json()
        setAllPosts(result.data.reverse())
      }
    } catch (error) {
      alert(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  //* SEARCH POSTS - NAME & PROMPT *//
  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout)
    setSearchText(e.target.value)

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = allPosts.filter(
          (item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.prompt.toLowerCase().includes(searchText.toLowerCase())
        )
        setSearchedResult(searchResult)
      }, 300)
    )
  }

  return (
    <section className="mx-auto max-w-7xl">
      <div>
        <h1 className="text-[34px] font-[500] text-[#222328]">
          The Community Showcase
        </h1>
        <p className="mt-2 max-w-[425px] text-[14px] text-[#666e75]">
          Browse through a collection of imaginative and visually stunning
          images generated by{" "}
          <a href="https://openai.com/dall-e-2/">
            <span className="font-[500] text-[#666e75] underline underline-offset-2 hover:cursor-pointer hover:text-[#6469ff] hover:drop-shadow-lg hover:active:text-black">
              {" "}
              DALL-E 2
            </span>{" "}
          </a>
          Artificial Intelligence.
        </p>
      </div>

      <div className="mt-16">
        <FormField
          labelName="Search Posts"
          type="text"
          name="text"
          placeholder="Search for something..."
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>

      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="mb-3 text-xl font-medium text-[#666e75]">
                Showing results for
                <span className="text-[#222328]"> {searchText}</span>
              </h2>
            )}
            <div className="grid grid-cols-1 gap-3 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
              {searchText ? (
                <RenderCards
                  title="No Search Results Found"
                  data={searchedResult}
                />
              ) : (
                <RenderCards title="No Posts Yet" data={allPosts} />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default Home