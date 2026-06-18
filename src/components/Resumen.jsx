import MarkdownView from './MarkdownView'
import resumenMd from '../../docs_gugjav/01_resumen_gugjav.md?raw'

function Resumen() {
  return <MarkdownView markdown={resumenMd} />
}

export default Resumen