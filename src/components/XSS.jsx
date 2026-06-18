import MarkdownView from './MarkdownView'
import xssMd from '../../docs_gugjav/03_xss_gugjav.md?raw'
import xssImg from '../../docs_gugjav/img_gugjav/xss_gugjav.png'

function XSS() {
  return (
    <MarkdownView
      markdown={xssMd}
      imageMap={{
        'img_gugjav/xss_gugjav.png': xssImg,
      }}
    />
  )
}

export default XSS