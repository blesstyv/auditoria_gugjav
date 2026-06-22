function normalizeImageSrc(src) {
  if (!src) return ''

  const cleanSrc = src.trim().replace(/^["']|["']$/g, '')

  if (
    cleanSrc.startsWith('http://') ||
    cleanSrc.startsWith('https://') ||
    cleanSrc.startsWith('data:')
  ) {
    return cleanSrc
  }

  if (cleanSrc.startsWith('/img_gugjav/')) {
    return cleanSrc
  }

  if (cleanSrc.includes('img_gugjav')) {
    const normalized = cleanSrc.replaceAll('\\', '/')
    const fileName = normalized.split('/').pop()
    return `/img_gugjav/${fileName}`
  }

  if (
    cleanSrc.endsWith('.png') ||
    cleanSrc.endsWith('.jpg') ||
    cleanSrc.endsWith('.jpeg') ||
    cleanSrc.endsWith('.webp')
  ) {
    const fileName = cleanSrc.replaceAll('\\', '/').split('/').pop()
    return `/img_gugjav/${fileName}`
  }

  return cleanSrc
}

function renderInline(text) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g)

  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>
    }

    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={index} className="inline-code">
          {part.slice(1, -1)}
        </code>
      )
    }

    return part
  })
}

function parseMarkdown(markdown) {
  const lines = markdown.split('\n')
  const blocks = []
  let index = 0

  while (index < lines.length) {
    const line = lines[index].trim()

    if (!line || line === '---') {
      index += 1
      continue
    }

    if (line.startsWith('```')) {
      const codeLines = []
      index += 1

      while (index < lines.length && !lines[index].trim().startsWith('```')) {
        codeLines.push(lines[index])
        index += 1
      }

      blocks.push({
        type: 'code',
        content: codeLines.join('\n'),
      })

      index += 1
      continue
    }

    if (line.startsWith('![')) {
      const match = line.match(/!\[(.*?)\]\((.*?)\)/)

      if (match) {
        blocks.push({
          type: 'image',
          alt: match[1],
          src: normalizeImageSrc(match[2]),
        })
      }

      index += 1
      continue
    }

    if (line.toLowerCase().startsWith('<img')) {
      const srcMatch = line.match(/src=["']([^"']+)["']/i)
      const altMatch = line.match(/alt=["']([^"']+)["']/i)

      if (srcMatch) {
        blocks.push({
          type: 'image',
          alt: altMatch ? altMatch[1] : 'Evidencia de auditoría',
          src: normalizeImageSrc(srcMatch[1]),
        })
      }

      index += 1
      continue
    }

    if (line.startsWith('|')) {
      const tableLines = []

      while (index < lines.length && lines[index].trim().startsWith('|')) {
        tableLines.push(lines[index].trim())
        index += 1
      }

      const rows = tableLines
        .filter((row) => !row.includes('---'))
        .map((row) =>
          row
            .split('|')
            .map((cell) => cell.trim())
            .filter((cell) => cell.length > 0),
        )

      blocks.push({
        type: 'table',
        rows,
      })

      continue
    }

    if (line.startsWith('# ')) {
      blocks.push({
        type: 'h1',
        content: line.replace('# ', ''),
      })

      index += 1
      continue
    }

    if (line.startsWith('## ')) {
      blocks.push({
        type: 'h2',
        content: line.replace('## ', ''),
      })

      index += 1
      continue
    }

    if (line.startsWith('### ')) {
      blocks.push({
        type: 'h3',
        content: line.replace('### ', ''),
      })

      index += 1
      continue
    }

    if (line.startsWith('- ')) {
      const items = []

      while (index < lines.length && lines[index].trim().startsWith('- ')) {
        items.push(lines[index].trim().replace('- ', ''))
        index += 1
      }

      blocks.push({
        type: 'ul',
        items,
      })

      continue
    }

    if (/^\d+\.\s/.test(line)) {
      const items = []

      while (index < lines.length && /^\d+\.\s/.test(lines[index].trim())) {
        items.push(lines[index].trim().replace(/^\d+\.\s/, ''))
        index += 1
      }

      blocks.push({
        type: 'ol',
        items,
      })

      continue
    }

    const paragraphLines = [line]
    index += 1

    while (
      index < lines.length &&
      lines[index].trim() &&
      lines[index].trim() !== '---' &&
      !lines[index].trim().startsWith('#') &&
      !lines[index].trim().startsWith('|') &&
      !lines[index].trim().startsWith('- ') &&
      !/^\d+\.\s/.test(lines[index].trim()) &&
      !lines[index].trim().startsWith('```') &&
      !lines[index].trim().startsWith('![') &&
      !lines[index].trim().toLowerCase().startsWith('<img')
    ) {
      paragraphLines.push(lines[index].trim())
      index += 1
    }

    blocks.push({
      type: 'p',
      content: paragraphLines.join(' '),
    })
  }

  return blocks
}

function MarkdownImage({ src, alt }) {
  function handleImageError(event) {
    event.currentTarget.style.display = 'none'

    const message = event.currentTarget.parentElement.querySelector(
      '.image-error-message',
    )

    if (message) {
      message.style.display = 'block'
    }
  }

  return (
    <figure className="evidence-figure">
      <img src={src} alt={alt} loading="lazy" onError={handleImageError} />

      <div className="image-error-message">
        No se pudo cargar la imagen: <strong>{src}</strong>
      </div>

      <figcaption>{alt}</figcaption>
    </figure>
  )
}

function MarkdownView({ markdown }) {
  const blocks = parseMarkdown(markdown || '')

  return (
    <div className="markdown-view">
      {blocks.map((block, index) => {
        if (block.type === 'h1') {
          return <h1 key={index}>{renderInline(block.content)}</h1>
        }

        if (block.type === 'h2') {
          return <h2 key={index}>{renderInline(block.content)}</h2>
        }

        if (block.type === 'h3') {
          return <h3 key={index}>{renderInline(block.content)}</h3>
        }

        if (block.type === 'p') {
          return <p key={index}>{renderInline(block.content)}</p>
        }

        if (block.type === 'ul') {
          return (
            <ul key={index}>
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex}>{renderInline(item)}</li>
              ))}
            </ul>
          )
        }

        if (block.type === 'ol') {
          return (
            <ol key={index}>
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex}>{renderInline(item)}</li>
              ))}
            </ol>
          )
        }

        if (block.type === 'code') {
          return (
            <pre key={index}>
              <code>{block.content}</code>
            </pre>
          )
        }

        if (block.type === 'image') {
          return <MarkdownImage key={index} src={block.src} alt={block.alt} />
        }

        if (block.type === 'table') {
          return (
            <div key={index} className="table-wrapper">
              <table>
                <tbody>
                  {block.rows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, cellIndex) =>
                        rowIndex === 0 ? (
                          <th key={cellIndex}>{renderInline(cell)}</th>
                        ) : (
                          <td key={cellIndex}>{renderInline(cell)}</td>
                        ),
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        }

        return null
      })}
    </div>
  )
}

export default MarkdownView