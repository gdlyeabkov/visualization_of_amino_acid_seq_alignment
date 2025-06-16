import './index.css'

export default (props: {
  firstSeq: string | null,
  secondSeq: string | null
}) => {
  const firstOutputAminoAcidSeq =
    props.firstSeq === null ?
      ''
    : props.firstSeq
        ?.toUpperCase()
        .split('')

  const isCysteine = (e: string) => e.toLowerCase() === 'c'

  const isHydrophobic = (e: string) => [
    'A',
    'I',
    'L',
    'M',
    'F',
    'W',
    'Y',
    'V',
    'P',
  ].includes(e)

  const isGlycine = (e: string) => e === 'G'

  const isNegCharged = (e: string) => [
    'D',
    'E'
  ].includes(e)

  const isPositiveCharged = (e: string) => [
    'K',
    'R'
  ].includes(e)

  const isPolarUncharged = (e: string) => [
    'S',
    'T',
    'H',
    'Q',
    'N',
  ].includes(e)
  
  return (
    <>
      {
        !props.firstSeq ||
        !props.secondSeq ?
          <></>
        :
          <div id="result" className="mt-3 fw-bold text-success">
            <div>
              {
                props.firstSeq
                  .toUpperCase()
                  .split('')
                  .map((e: string, idx: number) => (
                    <span
                      className={
                        [
                          'result-aminoAcid',
                          isCysteine(e) ?
                            'cysteine'
                          : isHydrophobic(e) ?
                            'hydrophobic'
                          : isGlycine(e) ?
                            'glycine'
                          : isNegCharged(e) ?
                            'negatively-charged'
                          : isPositiveCharged(e) ?
                            'positively-charged'
                          : isPolarUncharged(e) ?
                            'polar-uncharged'
                          : '',
                        ].join(' ')
                      }
                      key={idx}>
                      { e }
                    </span>
                  ))
              }
            </div>
            <br />
            <div>
              {
                props.secondSeq
                  .toUpperCase()
                  .split('')
                  .map((e: string, idx: number) => (
                    <span
                      className={
                        [
                          'result-aminoAcid',
                          isCysteine(e) && e !== firstOutputAminoAcidSeq[idx] ?
                            'cysteine'
                          : isHydrophobic(e) && e !== firstOutputAminoAcidSeq[idx] ?
                            'hydrophobic'
                          : isGlycine(e) && e !== firstOutputAminoAcidSeq[idx] ?
                            'glycine'
                          : isNegCharged(e) && e !== firstOutputAminoAcidSeq[idx] ?
                            'negatively-charged'
                          : isPositiveCharged(e) && e !== firstOutputAminoAcidSeq[idx] ?
                            'positively-charged'
                          : isPolarUncharged(e) && e !== firstOutputAminoAcidSeq[idx] ?
                            'polar-uncharged'
                          : ''
                        ].join(' ')
                      }
                      key={idx}>
                      { e }
                    </span>
                  ))
              }
            </div>
          </div>
      }
    </>
  )
}
