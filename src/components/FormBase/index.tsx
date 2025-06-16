import { useState, type Dispatch, type FormEvent, type KeyboardEvent, type SetStateAction } from 'react'
import './index.css'

export default (props: {
  setFirstSeq: Dispatch<SetStateAction<string | null>>,
  setSecondSeq: Dispatch<SetStateAction<string | null>>
}) => {
  const [firstInput, setFirstInput] = useState<string | number | string[] | undefined>('')
  const [secondInput, setSecondInput] = useState<string | number | string[] | undefined>('')
  const [isSubmitted, setSubmitted] = useState<boolean>(false)
  
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    setSubmitted(true)
    if (
      !firstInput?.toString().length ||
      !secondInput?.toString().length ||
      firstInput?.toString().length !== secondInput?.toString().length
    ) return
    // TODO: update result
    props.setFirstSeq(firstInput.toString())
    props.setSecondSeq(secondInput.toString())
  }

  const allowedChars = /^[vVlLsSpPaAdDkKtTnNiIkKaAsSwWeEkKiIgGhH-]*$/
  
  const allowedHotkeys = [
    'ArrowLeft',
    'ArrowRight',
    'Backspace',
    'Tab',
  ]

  const onFirstInputKeyDown = (e: KeyboardEvent) => {
    if (
      !allowedChars.test(e.key) &&
      allowedHotkeys.every((key: string) => e.key !== key)
    ) e.preventDefault()
  }
  
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <input
            type="text"
            id="input1"
            placeholder="Первое значение"
            className={
              [
                'form-control',
                ...(
                  isSubmitted &&
                  !firstInput?.toString().length
                  ?
                    [
                      'input--invalid'
                    ]
                  : []
                )
              ].join(' ')
            }
            value={firstInput}
            onChange={(e) => setFirstInput(e.currentTarget.value)}
            onKeyDown={(e) => onFirstInputKeyDown(e)} />
        </div>
        <p className="error-msg mb-3">
          {
            isSubmitted ?
              (
                !firstInput?.toString().length ?
                  'Поле обязательно'
                : ''
              )
            : ''
          }
        </p>
        <div className="mb-2">
          <input
            type="text"
            id="input2"
            placeholder="Второе значение"
            className={
              [
                'form-control',
                ...(
                  isSubmitted && (
                    !secondInput?.toString().length ||
                    firstInput?.toString().length !== secondInput?.toString().length
                  ) ?
                    [
                      'input--invalid'
                    ]
                  : []
                )
              ].join(' ')
            }
            value={secondInput}
            onChange={(e) => setSecondInput(e.currentTarget.value)}
            onKeyDown={(e) => onFirstInputKeyDown(e)} />
        </div>
        <p className="error-msg mb-3">
          {
            isSubmitted ?
              (
                !secondInput?.toString().length ?
                  'Поле обязательно'
                : firstInput?.toString().length !== secondInput?.toString().length ?
                  'Длина полей должна совпадать'
                : ''
              )
            : ''
          }
        </p>
        <button type="submit" className="btn btn-primary">Показать</button>
      </form>
    </>
  )
}
