import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { ThemeWrapper } from 'Commons/tests/Tests.Helpers'
import React from 'react'
import { Modal } from '../Modal.Modal'

describe('test modal', () => {
  it('test modal clickoutside', async () => {
    const onClose = jest.fn()
    const { container } = render(
      <ThemeWrapper>
        <Modal open onClose={onClose}>
          foo bar
        </Modal>
        <div data-testid="outside">foo outside</div>
      </ThemeWrapper>,
    )

    fireEvent.keyDown(container, {
      key: 'Escape',
    })

    expect(onClose).toHaveBeenCalled()
    await userEvent.click(await screen.getByTestId('containerClickOutside'))
    expect(onClose).toBeCalledTimes(1)
  })
})
