import { Fragment } from "react"

/**
 * Renders the one bolded lead phrase that `content.ts` marks with
 * `**double asterisks**`. Kept deliberately tiny: the content model needs a way
 * to say "emphasise this", not a markdown parser.
 */
export function Rich({ text }: { text: string }) {
  const parts = text.split("**")

  return (
    <>
      {parts.map((part, index) =>
        index % 2 === 1 ? (
          <strong key={index}>{part}</strong>
        ) : (
          <Fragment key={index}>{part}</Fragment>
        )
      )}
    </>
  )
}
