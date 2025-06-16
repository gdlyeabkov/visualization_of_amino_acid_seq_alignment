import { useEffect, useState } from 'react'
import './App.css'
import { toast, ToastContainer } from 'react-toastify'
import FormBase from './components/FormBase'
import SeqResult from './components/SeqResult'

export default () => {
  const [firstSeq, setFirstSeq] = useState<string | null>(null)
  const [secondSeq, setSecondSeq] = useState<string | null>(null)
  
  useEffect(() => {
    document.addEventListener('touchend', () => {
      if (isMobile())
        handleSelection()
    })
    document.addEventListener('mouseup', () => {
      if (!isMobile())
        handleSelection()
    })
  }, [])

  const isMobile = () => typeof screen.orientation === 'undefined'

  const handleSelection = () => {
    const focusNode = document
      .getSelection()
      ?.focusNode
    if (focusNode instanceof HTMLElement)
      copySelectedElContent(focusNode)
    else if (focusNode?.parentElement instanceof HTMLElement)
      copySelectedElContent(focusNode?.parentElement)
  }

  const copySelectedElContent = (node: HTMLElement) => {
    if (node?.classList.contains('result-aminoAcid')) {
      const content = document.getSelection()!.toString()
      if (content.length) {
        navigator
          .clipboard
          .writeText(content)
        toast.success('Скопировано')
      }
    }
  }
  
  return (
    <>
      <div className="container my-4">
        <div className="card p-4 shadow-sm">
          <h4 className="mb-3">Выравнивание аминокислотных последовательностей</h4>
          <FormBase
            setFirstSeq={setFirstSeq}
            setSecondSeq={setSecondSeq} />
          <SeqResult firstSeq={firstSeq} secondSeq={secondSeq} />
        </div>
      </div>
      <ToastContainer />
    </>
  )
}
