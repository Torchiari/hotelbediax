import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import App from "./App"

describe("App component", () => {
  it("renders header and links", () => {
    render(<App />)

    expect(screen.getByText("HotelBediaX")).toBeInTheDocument()
    expect(screen.getByText("Destinations")).toBeInTheDocument()

    expect(
      screen.getByText(/Bienvenido — Selecciona “Destinations” para comenzar/i)
    ).toBeInTheDocument()
  })
})
