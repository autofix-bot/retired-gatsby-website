import React, { useState } from 'react'

import styled from '@emotion/styled'
import { colors, borders } from '../../styles/variables'
import Arrow from '../Arrow'
import TypeFoxLogo from '../../resources/typefox.png'

const StyledExpandableJob = styled.div`
    position: relative;
    padding: 4rem 4rem 4rem 10rem;
    background: ${colors.offWhite};
    border: ${borders.light2};
    border-radius: 3px;

    @media(max-width: 600px) {
        padding: 4rem 2rem 2rem 8rem;
    }

    button {
        position: absolute;
        top: 4rem;
        left: 4rem;
        border: none;
        transform: translateY(-.6rem);

        @media(max-width: 600px) {
            left: 2rem;
        }

        &:hover {
            svg {
                fill: ${colors.text};
            }
        }
    }

    p + p {
        margin-top: 2rem;
    }

    .after {
        margin: 5rem 0;
    }

    .btn {
        margin-bottom: 5rem;
    }

    h4 {
        margin: 5rem 0 2rem;
    }

    ul {
        list-style: initial;
        list-style-position: inside;
    }
`

interface List {
    title: string
    items: string[]
}

export interface ExpandableJobProps {
    title: string
    intro: string
    paragraphs: string
    lists: List[]
    textAfterTheLists: string
    rendered?: boolean
}

const ExpandableJob = ({ title, intro, paragraphs, lists, textAfterTheLists, rendered }: ExpandableJobProps) => {
    const [isRendered, setIsRendered] = useState<boolean>(rendered || false)

    const toggleIsRendered = () => {
        setIsRendered(!isRendered)
    }

    const applicationEmail = `mailto:contact@typefox.io?subject=Application as ${title}`

    const structuredData = {
          "@context": "https://schema.org/",
          "@type": "JobPosting",
          "title": title,
          "description": `<p>${intro}</p>${paragraphs.split('\n').map((p, i) => <p key={i+title}>{p}</p>)}`,
          "hiringOrganization": {
            "@type": "Organization",
            "name": "TypeFox GmbH",
            "sameAs": "https://www.typefox.io/",
            "logo": TypeFoxLogo,
            "contactPoint": {
              "@type": "ContactPoint",
              "url": "https://www.typefox.io/contact/"
            }
          },
          // Location: Kiel Office / Germany Remote / France Remote.
          // Ref: https://developers.google.com/search/docs/data-types/job-posting#remote-jobs
          "jobLocation": {
            "@type": "Place",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Am Germaniahafen 1",
              "addressLocality": "Kiel",
              "postalCode": "24143",
              "addressCountry": "Germany"
            }
          },
          "applicantLocationRequirements": [{
              "@type": "Country",
              "name": "Germany"
          },{
              "@type": "Country",
              "name": "France"
          }],
          "jobLocationType": "TELECOMMUTE",
          "employmentType": "FULL_TIME",
          "applicationContact": {
            "@type": "ContactPoint",
            "email": applicationEmail
          },
        };



    return (
        <StyledExpandableJob>
            <button onClick={toggleIsRendered}>
               <Arrow 
                styles={{ transform: isRendered ? 'rotate(-90deg)' : 'rotate(90deg)', fill: isRendered ? colors.text : '' }}
               />
            </button>
            <h3>{title}</h3>
            <p>{intro}</p>
            {isRendered ? (<>
            {paragraphs.split('\n').map((p, i) => <p key={i+title}>{p}</p>)}
                { lists.map((item, i) => <List key={i + item.title} {...item} />) }
                <p className="after">{textAfterTheLists}</p>
                <a 
                    href={applicationEmail}
                    target="_blank"
                    className="btn btn--cta"
                >
                    Apply Now
                </a>
            </>) : null}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />;
        </StyledExpandableJob>
    )
}

const List = ({ title, items }: List) => (
    <div>
        <h4>{title}</h4>
        <ul>
            {items.map((item, i) => <li key={item + i}>{item}</li>)}
        </ul>
    </div>
)

export default ExpandableJob
