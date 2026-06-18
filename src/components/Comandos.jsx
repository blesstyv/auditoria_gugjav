import MarkdownView from './MarkdownView'
import comandosMd from '../../docs_gugjav/04_comandos_gugjav.md?raw'
import comandosImg from '../../docs_gugjav/img_gugjav/comandos_gugjav.png'

function Comandos() {
  return (
    <MarkdownView
      markdown={comandosMd}
      imageMap={{
        'img_gugjav/comandos_gugjav.png': comandosImg,
      }}
    />
  )
}

export default Comandos