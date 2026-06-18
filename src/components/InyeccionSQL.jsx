import MarkdownView from './MarkdownView'
import sqliMd from '../../docs_gugjav/02_sqli_gugjav.md?raw'
import sqliImg from '../../docs_gugjav/img_gugjav/sqli_gugjav.png'

function InyeccionSQL() {
  return (
    <MarkdownView
      markdown={sqliMd}
      imageMap={{
        'img_gugjav/sqli_gugjav.png': sqliImg,
      }}
    />
  )
}

export default InyeccionSQL