import React from 'react'

function Crud() {
  return (
    <>
      <div className=' bg-gray-600  w-[100vw] h-[92.9vh]  flex flex-col items-center gap-10  '>
        <h1 className='text-4xl'>Mahsulot yarating</h1>
        <div className=''>
          <form action="">
            <div >
              <label htmlFor="">Mahsulot nomi</label>
              <input type="text" id='name' className='w-[40vw] bg-amber-500' value={{}} />
            </div>
            <div>
              <label htmlFor="">Mahsulot narxi</label>
              <input type="number" id='price' className='w-[40vw] bg-amber-500' />
            </div>
            <div>
              <select name="" id="">
          

              </select>
            </div>


            <div>
              <label htmlFor=""></label>
              <input type="text" />
            </div>
            <div>
              <label htmlFor=""></label>
              <input type="text" />
            </div>

          </form>


        </div>
      </div>
    </>
  )
}

export default Crud