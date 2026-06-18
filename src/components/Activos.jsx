import MarkdownView from './MarkdownView'
import activosMd from '../../docs_gugjav/05_activos_gugjav.md?raw'

function Activos() {
  return <MarkdownView markdown={activosMd} />
}

export default Activos