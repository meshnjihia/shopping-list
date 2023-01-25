import React, { useEffect, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im'
import { HiChevronDoubleDown, HiChevronDoubleUp } from 'react-icons/hi'
import { CgTrash } from 'react-icons/cg'

import { v4 as uuidv4 } from 'uuid'

import ReactModal from 'react-modal'


const CreateNewList = () => {
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem('items')) || [],
  )
  const [inputValue, setInputValue] = useState('')
  const [totalItemCount, setTotalItemCount] = useState(0)
  const [totalItemPrice, setTotalItemPrice] = useState(0)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [itemToDelete, setItemToDelete] = useState(null)

  const handleAddItemClick = () => {
    if (!inputValue.trim()) {
      return null
    }
    const newItem = {
      itemName: inputValue,
      quantity: 1,
      isSelected: false,
      id: uuidv4(),
      price: 0,
    }

    const newItems = [newItem, ...items]
    setItems(newItems)
    setInputValue('')
    calcTotal()
    calcTotalPrice()
  }

  const handleQuantityDecrease = (index) => {
    const newItems = [...items]
    newItems[index].quantity--
    setItems(newItems)
    calcTotal()
    calcTotalPrice()
  }
  const handleQuantityIncrease = (index) => {
    const newItems = [...items]
    newItems[index].quantity++
    setItems(newItems)
    calcTotal()
    calcTotalPrice()
  }

  const toggleSelected = (index) => {
    const newItems = [...items]
    newItems[index].isSelected = !newItems[index].isSelected
    setItems(newItems)
    calcTotalPrice()
  }

  const calcTotal = () => {
    const totalItemCount = items.reduce((total, item) => {
      return total + item.quantity
    }, 0)
    setTotalItemCount(totalItemCount)
  }

  const calcTotalPrice = () => {
    let total = 0
    for (const item of items) {
      total += item.quantity * item.price
    }
    setTotalItemPrice(total)
  }

  const handleDeleteItem = (index) => {
    setIsConfirmOpen(true)
    setItemToDelete(index)
  }

  const confirmDelete = () => {
    const newItems = [...items]
    newItems.splice(itemToDelete, 1)
    setItems(newItems)
    calcTotal()
    calcTotalPrice()
    setIsConfirmOpen(false)
  }
  const cancelDelete = () => {
    setIsConfirmOpen(false)
  }

  const handlePriceChange = (e, index) => {
    const newItems = [...items]
    newItems[index].price = e.target.value
    setItems(newItems)
    calcTotalPrice()
  }

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items))
    calcTotal()
    calcTotalPrice()
  }, [items])

  return (
    <section className="font-montserrat">
      {/* main container */}
      <div className="bg-primary p-5 shadow-xl">
        {/* add Item box */}
        <div className="bg-primary-light text-primary my-4 flex items-center rounded-lg p-1.5">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleAddItemClick()
              }
            }}
            placeholder="Add an Item..."
            className="border-none bg-transparent text-primary font-medium w-full h-7 placeholder:text-primary placeholder:font-medium outline-none capitalize"
          />
          <AiOutlinePlus
            onClick={() => handleAddItemClick()}
            className="m-1 hover:cursor-pointer bg-primary/10 hover:bg-transparent hover:text-white rounded-full"
            size={20}
          />
        </div>

        {/* item-list */}
        <div className="flex flex-col mx-auto px-5">
          {items.map((item, index) => (
            <div
              key={item.id}
              className="grid grid-cols-4 gap-4 items-center border-b mb-4 pb-4 border-primary-light/60"
            >
              <div
                onClick={() => toggleSelected(index)}
                className="flex flex-col cursor-pointer text-white"
              >
                {item.isSelected ? (
                  <div>
                    <span className="text-sm text-stone-400">marked</span>
                    <div className="flex items-center ">
                      <ImCheckboxChecked className="mr-1.5" />
                      <span className="text-sm line-through">
                        {item.itemName}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div>
                    <span className="text-sm text-lime-500">Unmarked</span>
                    <div className="flex items-center">
                      <ImCheckboxUnchecked className="mr-1.5" />
                      <span className="font-medium capitalize">
                        {item.itemName}
                      </span>
                    </div>
                  </div>
                )}
              </div>
              <div className="bg-primary-light flex-col sm:flex-row  gap-4 items-center py-1 px-2 text-white rounded-xl justify-end">
                <label className="text-xs" htmlFor="price">
                  Price:
                </label>
                <input
                  type="number"
                  value={item.price}
                  onChange={(e) => handlePriceChange(e, index)}
                  className="py-1 border-none bg-transparent text-primary font-medium w-full outline-none text-xs "
                />
              </div>
              <div className="flex items-center justify-end ml-16">
                <div className="bg-white text-primary border rounded-2xl items-center border-primary px-4 py-2">
                  <button>
                    <HiChevronDoubleDown
                      onClick={() => handleQuantityDecrease(index)}
                    />
                  </button>
                  <small className="mx-2 text-zinc-900 font-semibold">
                    {item.quantity}
                  </small>
                  <button>
                    <HiChevronDoubleUp
                      onClick={() => handleQuantityIncrease(index)}
                    />
                  </button>
                </div>
              </div>
              <div className="flex justify-end t rounded-md">
                <CgTrash
                  onClick={() => handleDeleteItem(index)}
                  size={25}
                  className="cursor-pointer text-red-600 bg-primary-light"
                />
              </div>
            </div>
          ))}
          {/* item container */}
        </div>
        {/* totals */}
        <div className="flex flex-row  w-full">
          <div className="text-white ml-auto font-semibold mt-4">
            Total Price:{' '}
            <span className="bg-slate-600 py-2 px-3 inline-block items-center rounded-md shadow-md shadow-black">
              ksh {totalItemPrice}
            </span>
          </div>
          <div className="text-white flex ml-auto mt-4 items-center">
            Total Items Count:{'  '}
            <span className="bg-slate-600 p-2 rounded-md shadow-md shadow-black">
              {totalItemCount}
            </span>
          </div>
        </div>
      </div>

      <ReactModal
        isOpen={isConfirmOpen}
        onRequestClose={cancelDelete}
        ariaHideApp={false}
        className="bg-white p-4 rounded-md"
        overlayClassName="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 z-50 flex items-center justify-center"
      >
        <p>Are you sure you want to delete this item?</p>
        <div className="flex justify-end gap-8 mt-4">
          <button className='bg-red-400 px-2 py-1 rounded-md' onClick={confirmDelete}>Confirm</button>
          <button className='bg-green-400 px-2 py-1 rounded-md' onClick={cancelDelete}>Cancel</button>
        </div>
      </ReactModal>
    </section>
  )
}

export default CreateNewList
