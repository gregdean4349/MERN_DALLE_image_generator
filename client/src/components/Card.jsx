import { download } from "../assets"
import { downloadImage } from "../utils"

const Card = ({ _id, name, prompt, photo }) => {
  return (
    <div className="card group relative rounded-xl shadow-card hover:shadow-cardhover">
      <img
        className="h-auto w-full rounded-xl object-cover"
        src={photo}
        alt={prompt}
      />
      <div className="absolute bottom-0 left-0 right-0 m-2 hidden max-h-[94.5%] flex-col rounded-2xl bg-[#10131f]/60 px-10 pb-4 pt-3 group-hover:flex ">
        <p className="prompt text-md overflow-y-auto  font-extralight capitalize text-white">
          {prompt}
        </p>

        <div className="mt-2 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-700 object-cover text-sm font-extralight uppercase text-white">
              {name[0]}
            </div>
            <p className="text-base font-extralight capitalize text-white">
              {name}
            </p>
          </div>
          <button
            type="button"
            onClick={() => downloadImage(_id, photo)}
            className="border-none bg-transparent outline-none"
          >
            <img
              src={download}
              alt="download"
              className="h-8 w-8 object-contain invert"
            />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Card
