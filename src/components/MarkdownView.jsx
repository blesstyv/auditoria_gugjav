function renderInline(text) {
  const parts = []
  const regex = /(\*\*[^*]+\*\*|`[^`]+`)/g
  let lastIndex = 0
  let match

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }

    const value = match[0]

    if (value.startsWith('**')) {
      parts.push(
        <strong key={`${value}-${match.index}`}>
          {value.slice(2, -2)}
        </strong>,
      )
    }

    if (value.startsWith('`')) {
      parts.push(
        <code key={`${value}-${match.index}`} className="inline-code">
          {value.slice(1, -1)}
        </code>,
      )
    }

    lastIndex = regex.lastIndex
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }

  return parts
}

function parseMarkdown(markdown, imageMap = {}) {
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
          src: imageMap[match[2]] || match[2],
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
      !lines[index].trim().startsWith('![')
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

function MarkdownView({ markdown, imageMap = {} }) {
  const blocks = parseMarkdown(markdown, imageMap)

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
          return (
            <figure key={index} className="evidence-figure">
              <img src={block.src} alt={block.alt} />
              <figcaption>{block.alt}</figcaption>
            </figure>
          )
        }

        if (block.type === 'table') {
          return (
            <div key={index} className="table-wrapper">
              <table>
                <tbody>
                  {block.rows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, cellIndex) => {
                        if (rowIndex === 0) {
                          return <th key={cellIndex}>{renderInline(cell)}</th>
                        }

                        return <td key={cellIndex}>{renderInline(cell)}</td>
                      })}
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