import MarkdownView from './MarkdownView'
import promptsMd from '../../docs_gugjav/09_prompts_gugjav.md?raw'

function Prompts() {
  return <MarkdownView markdown={promptsMd} />
}

export default Prompts