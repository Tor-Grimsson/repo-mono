const HomeCardStory = () => {
  return (
    <section>
      <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-32 lg:pt-48">
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h1 className="text-5xl font-medium md:text-6xl">
            Healthier daily routine
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg">
            Tailwindcss highly customizable components for building modern websites and applications that look and feel the way you mean it.
          </p>

          <div className="mt-12">
            <form className="mx-auto max-w-sm">
              <div className="bg-background has-[input:focus]:ring-muted relative grid grid-cols-[1fr_auto] items-center rounded-[calc(var(--radius)+0.5rem)] border pr-2 shadow shadow-zinc-950/5 has-[input:focus]:ring-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail pointer-events-none absolute inset-y-0 left-4 my-auto size-4">
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
                <input placeholder="Your mail address" className="h-12 w-full bg-transparent pl-12 focus:outline-none" type="email" />
                <div className="md:pr-1.5 lg:pr-0">
                  <button className="cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow-sm shadow-black/20 bg-primary text-primary-foreground hover:bg-primary/90 h-8 px-3 text-xs rounded-(--radius)" aria-label="submit">
                    <span className="hidden md:block">Get Started</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-send-horizontal relative mx-auto size-5 md:hidden">
                      <path d="M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z"></path>
                      <path d="M6 12h16"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </form>

            <div className="relative mx-auto mt-32 max-w-2xl">
              {/* Background card */}
              <div className="bg-surface-secondary border-auto absolute inset-0 mx-auto w-full max-w-[320px] -translate-x-3 -translate-y-12 rounded-[2rem] border p-2 opacity-30 sm:-translate-x-6">
                <div className="relative h-96 overflow-hidden rounded-[1.5rem] border border-auto p-2 pb-12 before:absolute before:inset-0 before:bg-[repeating-linear-gradient(-45deg,var(--kol-border-primary),var(--kol-border-primary)_1px,transparent_1px,transparent_6px)] before:opacity-50"></div>
              </div>

              {/* Foreground card */}
              <div className="bg-surface-tertiary border-auto mx-auto w-full max-w-[320px] translate-x-4 rounded-[2rem] border p-2 backdrop-blur-sm sm:translate-x-8">
                <div className="bg-surface-primary space-y-2 overflow-hidden rounded-[1.5rem] border border-auto p-2 shadow-xl">
                  <div className="relative space-y-3 rounded-2xl bg-surface-tertiary p-4">
                    <div className="flex items-center gap-1.5 text-orange-400">
                      <svg className="size-5" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32">
                        <g fill="none">
                          <path fill="#ff6723" d="M26 19.34c0 6.1-5.05 11.005-11.15 10.641c-6.269-.374-10.56-6.403-9.752-12.705c.489-3.833 2.286-7.12 4.242-9.67c.34-.445.689 3.136 1.038 2.742c.35-.405 3.594-6.019 4.722-7.991a.694.694 0 0 1 1.028-.213C18.394 3.854 26 10.277 26 19.34"></path>
                          <path fill="#ffb02e" d="M23 21.851c0 4.042-3.519 7.291-7.799 7.144c-4.62-.156-7.788-4.384-7.11-8.739C9.07 14.012 15.48 10 15.48 10S23 14.707 23 21.851"></path>
                        </g>
                      </svg>
                      <div className="text-sm font-medium text-auto">Steps</div>
                    </div>
                    <div className="space-y-3">
                      <div className="text-auto border-b border-auto pb-3 text-sm font-medium">
                        This year, you're walking more on average than you did in 2023.
                      </div>
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <div className="flex items-baseline gap-1">
                            <span className="text-auto text-xl font-medium">8,081</span>
                            <span className="text-auto opacity-60 text-xs">Steps/day</span>
                          </div>
                          <div className="flex h-5 items-center rounded bg-gradient-to-l from-emerald-400 to-indigo-600 px-2 text-xs text-white">
                            2024
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-baseline gap-1">
                            <span className="text-auto text-xl font-medium">5,412</span>
                            <span className="text-auto opacity-60 text-xs">Steps/day</span>
                          </div>
                          <div className="text-auto bg-surface-secondary flex h-5 w-2/3 items-center rounded px-2 text-xs">
                            2023
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-surface-tertiary rounded-2xl p-4 pb-16"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeCardStory
