export default () => {
    return (
        <div
      className="flex flex-col md:flex-row h-full bg-secondary text-white hover:text-green shadow-md rounded-md transform transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg md:max-h-50 lg:max-h-40">
      <img
        src="https://i.pinimg.com/736x/30/d1/38/30d138598d32a441711f97ef1c90f414.jpg"
        alt=""
        className="w-full h-40 rounded-t-md object-cover md:rounded-l-md md:rounded-t-none md:w-2/5 md:h-44 lg:h-40"/>
      <div className="absolute items-baseline l-0 m-2">
        <div
          className="flex font-nunito font-semibold text-xs bg-gray-300 rounded-full px-2">
          {/* <Icon name="clock" width="15" class="text-black" /> */}
          <span v-html="updated_on" className="ml-0.5 mt-0.5 text-black"></span>
        </div>
      </div>
      <div className="p-3 md:pt-2 md:px-3">
        <h1 v-html="title" className="font-ptserif text-md mb-1"></h1>
        <span v-html="chapter" className="font-poppins text-white text-xs"></span>
      </div>
    </div>
    )
}