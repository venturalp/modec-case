import { scroller } from 'react-scroll'

export const scrollTo = name => {
  scroller.scrollTo(name, {
    duration: 1000,
    delay: 0,
    offset: -50,
    smooth: true,
  })
}
