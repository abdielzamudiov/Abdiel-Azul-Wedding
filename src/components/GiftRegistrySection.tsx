import { useState } from 'react'
import { BankIcon, CheckIcon, CopyIcon, GiftIcon } from './MonetIcons'
import { WEDDING_DETAILS } from '../config/weddingDetails'
import japaneseFootbridge from '../assets/monet-japanese-footbridge.png'

interface GiftRegistrySectionProps {
  registryUrl?: string
  bankName?: string
  accountHolder?: string
  accountNumber?: string
  clabeNumber?: string
}

export function GiftRegistrySection({
  registryUrl = WEDDING_DETAILS.registryUrl,
  bankName = WEDDING_DETAILS.bankName,
  accountHolder = WEDDING_DETAILS.accountHolder,
  accountNumber = WEDDING_DETAILS.accountNumber,
  clabeNumber = WEDDING_DETAILS.clabeNumber,
}: GiftRegistrySectionProps) {
  const [copiedClabe, setCopiedClabe] = useState(false)
  const [copiedAccount, setCopiedAccount] = useState(false)

  const handleCopyClabe = async () => {
    if (!clabeNumber) return
    try {
      await navigator.clipboard.writeText(clabeNumber)
      setCopiedClabe(true)
      setTimeout(() => setCopiedClabe(false), 2500)
    } catch {
      // Fallback
    }
  }

  const handleCopyAccount = async () => {
    if (!accountNumber) return
    try {
      await navigator.clipboard.writeText(accountNumber)
      setCopiedAccount(true)
      setTimeout(() => setCopiedAccount(false), 2500)
    } catch {
      // Fallback
    }
  }

  const hasBankDetails = Boolean(bankName || accountHolder || accountNumber || clabeNumber)

  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-10 space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-moss)] font-semibold font-[var(--font-sans)]">
          Detalles de Obsequios
        </p>
        <h2 className="text-3xl sm:text-4xl font-serif font-medium text-[var(--text-main)]">
          Mesa de Regalos & Obsequios
        </h2>
        <div className="w-12 h-px bg-[var(--color-sage)] mx-auto opacity-50 my-2" />
      </div>

      <div
        className="relative bg-white rounded-2xl p-6 sm:p-10 border border-[var(--border-subtle)] shadow-[var(--shadow-card)] space-y-8 overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.91) 0%, rgba(255, 255, 255, 0.94) 75%, rgba(255, 255, 255, 1) 100%), url(${japaneseFootbridge})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'repeat',
        }}
      >
        {/* Polite Opening Text */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <p className="font-serif italic text-lg sm:text-xl text-[var(--text-main)]">
            {WEDDING_DETAILS.giftMessage}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Card 1: Mesa de Regalos Direct Link */}
          {Boolean(registryUrl) && (
            <div className="bg-[var(--surface-tint)] rounded-xl p-6 border border-[var(--border-subtle)] flex flex-col justify-between space-y-6 hover:shadow-md transition-shadow">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-white border border-[var(--border-subtle)] flex items-center justify-center text-[var(--color-moss)] shadow-sm">
                  <GiftIcon className="w-6 h-6" />
                </div>

                <div>
                  <span className="text-xs uppercase tracking-[0.14em] text-[var(--color-sage)] font-semibold font-[var(--font-sans)]">
                    Mesa de Regalos Digital
                  </span>
                  <h3 className="text-xl font-serif font-medium text-[var(--text-main)] mt-1">
                    Liverpool / Tiendas Seleccionadas
                  </h3>
                </div>

                <p className="text-xs text-[var(--text-muted)] leading-relaxed font-[var(--font-sans)]">
                  Pueden consultar nuestra lista de regalos en línea o buscar con el evento o los nombres de los novios.
                </p>
              </div>

              <div>
                <a
                  href={registryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full px-5 py-3 rounded-full text-xs font-semibold uppercase tracking-[0.14em] bg-[var(--color-sage)] text-white hover:bg-[var(--color-moss)] transition-all duration-300 shadow-sm cursor-pointer"
                >
                  Ver Mesa de Regalos 🎁
                </a>
              </div>
            </div>
          )}

          {/* Card 2: Lluvia de Sobres / Transferencia Bancaria */}
          {hasBankDetails && (
            <div className="bg-[var(--surface-tint)] rounded-xl p-6 border border-[var(--border-subtle)] flex flex-col justify-between space-y-6 hover:shadow-md transition-shadow">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-white border border-[var(--border-subtle)] flex items-center justify-center text-[var(--color-moss)] shadow-sm">
                  <BankIcon className="w-6 h-6" />
                </div>

                <div>
                  <span className="text-xs uppercase tracking-[0.14em] text-[var(--color-sage)] font-semibold font-[var(--font-sans)]">
                    Lluvia de Sobres / Transferencia
                  </span>
                  <h3 className="text-xl font-serif font-medium text-[var(--text-main)] mt-1">
                    Datos Bancarios
                  </h3>
                </div>

                <div className="space-y-2 text-xs text-[var(--text-main)] font-[var(--font-sans)] bg-white p-3.5 rounded-lg border border-[var(--border-subtle)]">
                  {Boolean(bankName) && (
                    <p>
                      <span className="text-[var(--text-muted)] font-medium">Banco:</span>{' '}
                      <strong className="font-semibold">{bankName}</strong>
                    </p>
                  )}
                  {Boolean(accountHolder) && (
                    <p>
                      <span className="text-[var(--text-muted)] font-medium">Titular:</span>{' '}
                      <strong className="font-semibold">{accountHolder}</strong>
                    </p>
                  )}

                  {/* Conditional Rendering for Account Number */}
                  {Boolean(accountNumber) && (
                    <div className="flex items-center justify-between pt-1 border-t border-[var(--border-subtle)]">
                      <span>
                        <span className="text-[var(--text-muted)] font-medium">Cuenta:</span>{' '}
                        <strong className="font-mono text-xs">{accountNumber}</strong>
                      </span>
                      <button
                        onClick={handleCopyAccount}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-[var(--color-moss)] hover:text-[var(--color-sage)] cursor-pointer"
                      >
                        {copiedAccount ? (
                          <>
                            <CheckIcon className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-600">¡Copiado!</span>
                          </>
                        ) : (
                          <>
                            <CopyIcon className="w-3.5 h-3.5" />
                            <span>Copiar Cuenta</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}

                  {/* Conditional Rendering for CLABE Number */}
                  {Boolean(clabeNumber) && (
                    <div className="flex items-center justify-between pt-1 border-t border-[var(--border-subtle)]">
                      <span>
                        <span className="text-[var(--text-muted)] font-medium">CLABE:</span>{' '}
                        <strong className="font-mono text-xs">{clabeNumber}</strong>
                      </span>
                      <button
                        onClick={handleCopyClabe}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-[var(--color-moss)] hover:text-[var(--color-sage)] cursor-pointer"
                      >
                        {copiedClabe ? (
                          <>
                            <CheckIcon className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-600">¡Copiado!</span>
                          </>
                        ) : (
                          <>
                            <CopyIcon className="w-3.5 h-3.5" />
                            <span>Copiar CLABE</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="text-center">
                <p className="text-[11px] text-[var(--text-muted)] italic font-[var(--font-sans)]">
                  En el evento también contaremos con un buzón de sobres para sus felicitaciones. ✉️
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
