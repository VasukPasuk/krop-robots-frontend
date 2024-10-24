function GeneralBlock() {
  return (
    <section className="flex flex-col gap-y-4 lg:flex-row lg:gap-x-4 relative items-center justify-center mb-48 lg:mb-32 ">
      <div className="flex aspect-video h-[500px] w-full rounded overflow-hidden">
        <img src="slider-image9.jpg" alt="Picture" className="object-cover w-full h-full"/>
      </div>

      <p className="common_text absolute w-[75%] rounded -bottom-40 lg:-bottom-24 bg-white p-8 text-black shadow-xl text-center">
        "KROP_ROBOTS" стає важливою частиною освітньої екосистеми Кропивницького, допомагаючи новому поколінню
        розвиватися у світі цифрових технологій, робототехніки та інженерії. Організація надає платформу для творчого
        розвитку, стимулює інтерес до науки та допомагає учасникам формувати навички, які будуть затребувані в
        майбутньому, готуючи їх до сучасного технологічного ринку праці.
      </p>
    </section>
  )
}

export default GeneralBlock


