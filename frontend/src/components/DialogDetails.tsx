import React from 'react'

function DialogDetails({ title, productInfo }: { title: string; productInfo: string | undefined }) {
  return (
    <>
    {(title === "Fragrances" && productInfo !== "") || (title !== "Fragrances") && (
    <div className="text-[#83667e] w-full mt-7">
        <p className="font-bold text-2xl">{title}</p>
        {productInfo ? (
        <p className="tracking-tight">
            {productInfo}
        </p>
        ) : (
        <p className="tracking-tight">
            No details available
        </p>
        )}
    </div>)}
    </>
  )
}

export default DialogDetails
