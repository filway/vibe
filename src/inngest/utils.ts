import { Sandbox } from '@e2b/code-interpreter'
import { AgentResult, TextMessage, type Message } from '@inngest/agent-kit'

export async function getSandBox(sandboxId: string) {
  const sandbox = await Sandbox.connect(sandboxId)
  return sandbox
}

export function lastAssistantTextMessageContent(result: AgentResult) {
  const lastAssistantTextMessageIndex = result.output.findLastIndex(
    (message) => message.role === 'assistant'
  )

  const message = result.output[lastAssistantTextMessageIndex] as
    | TextMessage
    | undefined
  return message?.content
    ? typeof message.content === 'string'
      ? message.content
      : message.content.map((c) => c.text).join('')
    : undefined
}

export const parseAgentOutput = (value: Message[]) => {
  const output = value[0]

  if (output.type !== 'text') {
    return 'Fragment'
  }

  if (Array.isArray(output.content)) {
    return output.content.map((txt) => txt).join('')
  } else {
    return output.content
  }
}
