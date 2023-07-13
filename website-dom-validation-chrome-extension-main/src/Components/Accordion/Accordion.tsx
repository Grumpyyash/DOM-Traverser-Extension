import React, { memo } from 'react'
import '../../TraverseDom/traverseDom.css'

import { ErrorObject } from '../../Interface/interface'

import Accordion from 'react-bootstrap/Accordion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'

type AccordionProps = {
  objectsArray: any[]
  type: string
  handleHightlight: (path: string) => void
  handleShowPath: (path: string) => void
}

export const AccordionComponent = memo(function ({
  objectsArray,
  type,
  handleHightlight,
  handleShowPath,
}: AccordionProps): JSX.Element {
  return (
    <Accordion defaultActiveKey="0">
      {objectsArray.map((errorObject, index) => {
        return (
          <Accordion.Item eventKey={index.toString()} key={index}>
            <Accordion.Header>
              {'<' + errorObject.elementName + '>'}
            </Accordion.Header>
            <Accordion.Body>
              {errorObject.elementErrors.map(
                (error: ErrorObject, index: number) => {
                  return (
                    <div key={index + 1} className="errors-map-element">
                      <div className="location-div">
                        <FontAwesomeIcon
                          icon={faLocationDot}
                          className="location-icon"
                        />
                        x-axis: {error.posX + 'px, '}
                        y-axis: {error.posY + 'px '}
                        <a
                          onClick={() => handleShowPath(error.path)}
                          className="show-path-anchor"
                        >
                          Show Full Path
                        </a>
                        {type === 'semantic' && (
                          <span className="accordion-header-span">
                            refer the{' '}
                            <a
                              href={
                                'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/' +
                                errorObject.elementName
                              }
                              target="_blank"
                              className="mdn-doc-link"
                            >
                              MDN docs
                            </a>{' '}
                            of this element
                          </span>
                        )}
                        <a
                          className="show-path-anchor"
                          onClick={() => handleHightlight(error.path)}
                        >
                          highlight this on the DOM
                        </a>
                      </div>
                      <div style={{ padding: '20px' }}>
                        <span>{'<' + error.elementName + '> '}</span>
                        <ul>
                          {error.messages.map(
                            (message: string, index: number) => {
                              return <li key={index + 1}>{message}</li>
                            }
                          )}
                        </ul>
                      </div>
                    </div>
                  )
                }
              )}
            </Accordion.Body>
          </Accordion.Item>
        )
      })}
    </Accordion>
  )
})
