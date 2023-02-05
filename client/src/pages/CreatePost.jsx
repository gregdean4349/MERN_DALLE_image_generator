import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { preview } from "../assets"
import { FormField, Loader } from "../components"
import { getRandomPrompt } from "../utils"

const CreatePost = () => {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  })

  const [generatingImg, setGeneratingImg] = useState(false)
  const [loading, setLoading] = useState(false)

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true)
        const response = await fetch("http://localhost:8080/api/v1/dalle", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: form.prompt,
          }),
        })

        const data = await response.json()
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` })
      } catch (error) {
        alert(error)
      } finally {
        setGeneratingImg(false)
      }
    } else {
      alert("Please provide a descriptive prompt")
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (form.prompt && form.photo) {
      setLoading(true)
      try {
        const response = await fetch("http://localhost:8080/api/v1/post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...form,
          }),
        })

        await response.json()
        navigate("/")
      } catch (error) {
        alert(error)
      } finally {
        setLoading(false)
      }
    } else {
      alert("Please generate an image with proper details")
    }
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt)
    setForm({ ...form, prompt: randomPrompt })
  }

  return (
    <section className="mx-auto max-w-7xl">
      <div>
        <h1 className="text-[34px] font-[500] text-[#222328]">
          Create AI Image
        </h1>
        <p className="mt-2 max-w-[425px] text-[14px] text-[#666e75]">
          Generate an imaginative image through{" "}
          <a href="https://openai.com/dall-e-2/">
            <span className="font-[500] text-[#666e75] underline underline-offset-2 hover:cursor-pointer hover:text-[#6469ff] hover:drop-shadow-lg hover:active:text-black">
              {" "}
              DALL-E 2
            </span>{" "}
          </a>{" "}
          Artificial Intelligence and share it with the community.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-16 max-w-3xl">
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Your Name"
            type="text"
            name="name"
            placeholder="Ex., john doe"
            value={form.name}
            handleChange={handleChange}
          />

          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="An Impressionist oil painting of sunflowers in a purple vase…"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />

          <div className="relative h-64 w-64 items-center justify-center rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500">
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="h-full w-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="h-9/12 w-9/12 object-contain opacity-40"
              />
            )}

            {generatingImg && (
              <div className="absolute inset-0 z-0 flex items-center justify-center rounded-lg bg-[rgba(0,0,0,0.5)]">
                <Loader />
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generateImage}
            className="w-full rounded-md bg-green-600 py-2.5 px-5 text-center text-sm font-medium text-white hover:shadow-md sm:w-auto"
          >
            {generatingImg ? "Generating Photo..." : "Generate Photo"}
          </button>
        </div>

        <div className="mt-7">
          <p className="text-[14px] text-[#666e75]">
            Once you have created the image you want, you can share it with
            others in the community.
          </p>
          <button
            type="submit"
            className="mt-2 w-full rounded-md bg-[#6469ff] px-5 py-2.5 text-center text-sm font-medium text-white hover:shadow-md sm:w-auto"
          >
            {loading ? "Sharing Photo..." : "Share with the Community"}
          </button>
        </div>
      </form>
    </section>
  )
}

export default CreatePost
