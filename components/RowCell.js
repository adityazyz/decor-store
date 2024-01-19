import React from 'react'

function RowCell(props) {



    const displayObject = (object)=>{
        // if socials struct
        if(object.instagram || object.facebook || object.twitter){
            return <>
             <div className={` text-gray-900 text-left w-[30vw] mt-0`}>
             {(object.instagram)?`Instagram : ${object.instagram}`:""}
             </div>
             <div className={` text-gray-900 text-left w-[30vw]`}>
             {(object.facebook)?`Facebook : ${object.facebook}`:""}
             </div>
             <div className={` text-gray-900 text-left w-[30vw]`}>
             {(object.twitter)?`Twitter : ${object.twitter}`:""}
             </div>
             </>
            
        }else if(typeof(object[0]===typeof(object[1]))){
            // if array   ..... alternative to .join()
            let singleString = "";
            for (let i = 0; i < object.length; i++) {
                singleString += object[i];
                if (i < object.length - 1) {
                  singleString += ', ';
                }
              }
              return singleString;
        }else{
            for (let key in object) {
                <div key={key} className={` text-gray-900 text-left w-[30vw]`}>
                {`${key} : ${object[key]}`}
                </div>
              }
        }
    }

  return (
<>
<div >
    <div  className="flex  py-2">
        <span className="text-gray-900 ">{props.field}</span>
        
        <span className={`ml-auto text-gray-900 text-left w-[35vw]`}>
    
            {(typeof(props.value) === "object")?displayObject(props.value):props.value}
            
        </span>
    </div>
    <div className='border-t border-gray-300 py-1'></div>
</div>    
</>
  )
}

export default RowCell