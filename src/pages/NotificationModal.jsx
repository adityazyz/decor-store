import React from 'react'


function NotificationModal() {
  return (
<>
{/* dropdown  */}
<div className="absolute right-[410px] top-[8vh] z-30 ">
                
                  <div className="absolute z-10 w-[410px] bg-white rounded-md shadow-lg">
                    {/* Dropdown Items */}
                    <div className=" text-left px-4 py-3 pl-6 text-[14px] text-gray-500 font-medium hover:bg-zinc-200 hover:text-black border-b-zinc-200 border-b-[1px]">
                        New Startup registered within your field of Expertise. Click to find out.
                      </div>
                      <div className=" text-left px-4 text-[14px] text-gray-500 font-medium py-2 hover:bg-zinc-200 hover:text-black border-b-zinc-200 border-b-[1px]">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero recusandae vel quia, consequuntur laboriosam repellat necessitatibus ullam et, tempore magni obcaecati reiciendis totam labore fugiat consectetur. Est eligendi nam eos.
                      </div>
                      <div className=" text-left px-4 text-[14px] text-gray-500 font-medium py-2 hover:bg-zinc-200 hover:text-black border-b-zinc-200 border-b-[1px]">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia sequi eum commodi, laudantium vitae sunt, libero id corporis.
                      </div>

                      <div className=" text-left px-4 text-[14px] text-gray-500 font-medium py-2 hover:bg-zinc-200 hover:text-black border-b-zinc-200 border-b-[1px]">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic cumque exercitationem totam nostrum atque repudiandae explicabo ratione maxime corrupti a?
                      </div>
                   
                      <div className=" text-left px-4 text-[14px] text-gray-500 font-medium py-2 hover:bg-zinc-200 hover:text-black border-b-zinc-200 border-b-[1px]">
                        Show more
                      </div>
                  </div>
              
              </div>
</>
  )
}

export default NotificationModal