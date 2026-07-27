const CtaGlobal = () => {
  return (
    <section className="reveal w-full bg-auto">

      <div className="w-full self-stretch py-10 inline-flex justify-start items-start gap-12 overflow-hidden">

         <div className="self-stretch flex-1 inline-flex flex-col justify-start items-start gap-16">
            <div className="reveal self-stretch justify-start text-auto kol-display-lg uppercase" style={{ '--reveal-delay': '0.1s' }}>
               / connect
            </div>
         </div>

         <div className="flex-1 self-stretch pt-32 pb-6 inline-flex flex-col justify-end items-start gap-12">
            <div className="reveal self-stretch flex flex-col justify-start items-start gap-2" style={{ '--reveal-delay': '0.2s' }}>
               <div className="justify-start text-auto kol-helper-16 uppercase">
               Working on a project?
               </div>
               <div className="justify-start text-auto kol-sans-heading-01 uppercase">
               Send a message
               </div>
            </div>
            <div className="reveal self-stretch flex flex-col justify-start items-start gap-2" style={{ '--reveal-delay': '0.3s' }}>
               <div className="justify-start text-auto kol-helper-16 uppercase">
               Contact
               </div>
               <a
               href="mailto:hello@kolkrabbi.io"
               className="justify-start text-auto kol-sans-heading-01 uppercase hover:opacity-70 transition-opacity"
               >
               hello@kolkrabbi.io
               </a>
            </div>
         </div>
      </div>
    </section>
  )
}

export default CtaGlobal
