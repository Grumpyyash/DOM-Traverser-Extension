import React from 'react'
import '../../TraverseDom/traverseDom.css'

import Accordion from 'react-bootstrap/Accordion'

type w3cAccordionProps = {
  errorsArray: any[]
  uniqueKey: string
  type: string
}

export const W3cAccordionComponent = ({
  errorsArray,
  uniqueKey,
  type,
}: w3cAccordionProps): JSX.Element => {
  return (
    <Accordion.Item eventKey={uniqueKey} key={uniqueKey}>
      <Accordion.Header>
        All of the accessibility {type} in your website based on WCAG guidelines
      </Accordion.Header>
      <Accordion.Body>
        {errorsArray.map((error, index) => {
          return (
            <div className="errors-map-element" key={index}>
              <div className="w3c-errors-heading">
                <p>{error.message}</p>
              </div>
              <p className="w3c-error-para">Location: {error.extract}</p>
            </div>
          )
        })}
      </Accordion.Body>
    </Accordion.Item>
  )
}
