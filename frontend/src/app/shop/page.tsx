"use client"
import React from 'react'
import Link from 'next/link'

import BackgroundMix from '@/components/BackgroundMix'

import { _discordRedirect, _discordUrl } from '@/utils/discordUrl';

export default function ShopPage() {
  return (
    <main className="flex flex-1 bg-gradient-to-b from-black to-(--gray-0) sm:items-center relative">
      <section className="section-shop section z-[5!important]">
        <div className="container flex flex-col items-center text-center">

          <h1 className="title text-center">
            Store 💰
          </h1>

          <p className="text-base text-white w-full mt-6">
            No! We don&apos;t sell anything. <br/>
            There&apos;s no game advantages you can buy with cash in this server.
          </p>

          <p className="text-base text-white w-full mt-6">
            But you can still help us with a donate! <br/>
            All donates goes to game server host payment. <br/>
            You can see monthly achieve progress below:
          </p>

          <div className="progress-bar flex flex-col items-center w-full mt-12">
            <div className="bar flex relative w-full max-w-160">
              <div className="background w-full h-[4px] rounded-[1.6rem] bg-(--gray-1)"></div>
              <div className={`progress absolute top-0 left-0 min-w-[0%] h-[4px] rounded-[1.6rem] bg-(--primary-orange-1)`}></div>
            </div>

            <p className="text text-sm text-white mt-4">
              $ 0.00 / <strong>$ 35.00</strong>
            </p>
          </div>

          <strong className="text-base text-white w-full mt-8">
            Server will stay online even without a fully charged bar. <span className="font-normal line-through text-(--gray-3)">fow now</span> <br/>
            When you donate you are just helping the project.
          </strong>

          <Link
            className="button-gray mt-12 hover:!bg-[#5865F2]"
            href={_discordUrl}
            onClick={_discordRedirect}
          >
            Contact us
            <svg className="icon fill-current ml-[.8rem]" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <title>Discord</title>
              <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/>
            </svg>
          </Link>

        </div>
      </section>
      <BackgroundMix char1="phoy" char2="jin" />
    </main>
  );
}