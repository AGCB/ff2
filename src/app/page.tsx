"use client"
import { useEffect, useState } from 'react';

const CONSTS = {
  CONTINUE_BUTTON: 'Continue',
  LICENSE_INFO: 'This app is open-source and available for use, modification, and distribution by anyone for any purpose.',
  START_BUTTON: 'Start',
  TITLE: 'FF2',
}

const Title = (
  <div>
    <h1 className="h-1/2 flex items-center">{CONSTS.TITLE}</h1>
  </div>)

const StartButton: React.FC<{current: boolean}> = ({current}) => {
  return (
    <>
      <button className="min-w-30 text-left">{`${CONSTS.START_BUTTON.toUpperCase()} ${current ? '👈': ''}`}</button>
    </>
  )
}

const ContinueButton: React.FC<{current: boolean}> = ({current}) => {
  return (
    <>
      <button className="min-w-30 text-left">{`${CONSTS.CONTINUE_BUTTON.toUpperCase()} ${current ? '👈': ''}`}</button>
    </>
  )
}
const LicenseInfo = (
  <span>{CONSTS.LICENSE_INFO}</span>
)


export default function Home() {
  const [selection, setSelection] = useState('start');
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if(event.key === 'ArrowLeft') {
        setSelection('start')
      } else if (event.key === 'ArrowRight') {
        setSelection('continue')
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  },[]);
  return (
    <div className="border-4 border-red-500 w-screen h-screen flex flex-col items-center gap-4">
      <div className="bg-gradient-to-r from-purple-600 to-blue-400 h-75 w-full ">
        {Title}
      </div>
      <div className="border-4 border-blue-400">
        <div className="border-4 border-yellow-400 flex justify-around">
          {<StartButton current={selection === 'start'}/>}
          {<ContinueButton current={selection === 'continue'} />}
        </div>
        {LicenseInfo}
      </div>
    </div>
  );
}
