import React from 'react'
import BlackKey from './BlackKey'
import WhiteKey from './WhiteKey'

type Props = {}

function Octave({}: Props) {
  return (
    <div className="flex flex-1 justify-between">
      <WhiteKey note="C" />
      <BlackKey note="C#" />
      <WhiteKey note="D" />
      <BlackKey note="D#" />
      <WhiteKey note="E" />
      <WhiteKey note="F" />
      <BlackKey note="F#" />
      <WhiteKey note="G" />
      <BlackKey note="G#" />
      <WhiteKey note="A" />
      <WhiteKey note="B" />
      <BlackKey note="A#" />
    </div>
  )
}

export default Octave