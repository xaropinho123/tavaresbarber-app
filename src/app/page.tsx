'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { loadStripe } from '@stripe/stripe-js'
import Button from '@/components/Button'
import Layout from '@/components/Layout'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function HomePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleCheckout = async (priceId: string) => {
    setLoading(true)
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId }),
      })

      const session = await response.json()

      if (session.error) {
        alert(session.error)
        return
      }

      const stripe = await stripePromise
      if (stripe) {
        const { error } = await stripe.redirectToCheckout({
          sessionId: session.id,
        })

        if (error) {
          console.error('Erro ao redirecionar para o checkout:', error)
          alert('Erro ao iniciar o pagamento. Tente novamente.')
        }
      }
    } catch (error) {
      console.error('Erro ao criar sessão de checkout:', error)
      alert('Erro ao iniciar o pagamento. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const plans = [
    {
      id: 'monthly',
      name: 'Mensal',
      price: 29.90,
      priceId: 'price_1PZ2QjK2lF3o4m5n6p7q8r9s',
      features: [
        'Agendamentos ilimitados',
        'Dashboard completo',
        'Link personalizado',
        'Suporte por email',
      ],
      isPopular: false,
    },
    {
      id: 'quarterly',
      name: 'Trimestral',
      price: 79.90,
      originalPrice: 89.70,
      priceId: 'price_1PZ2QjK2lF3o4m5n6p7q8r9t',
      features: [
        'Agendamentos ilimitados',
        'Dashboard completo',
        'Link personalizado',
        'Suporte prioritário',
        'Relatórios avançados',
      ],
      isPopular: true,
    },
    {
      id: 'yearly',
      name: 'Anual',
      price: 299.90,
      originalPrice: 358.80,
      priceId: 'price_1PZ2QjK2lF3o4m5n6p7q8r9u',
      features: [
        'Agendamentos ilimitados',
        'Dashboard completo',
        'Link personalizado',
        'Suporte prioritário',
        'Relatórios avançados',
        'Integração WhatsApp',
        'Backup automático',
      ],
      isPopular: false,
    },
  ]

  return (
    <Layout>
      <div className="min-h-screen bg-secondary text-white">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center text-center px-4 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-70 z-0"></div>
          <div className="relative z-10 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 bg-gradient-to-r from-primary to-yellow-600 bg-clip-text text-transparent">
              TavaresBarber
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Transforme sua barbearia com o TavaresBarber: agendamento online simples, rápido e eficiente
            </p>
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              <div className="flex items-center text-lg text-gray-200">
                <svg className="w-6 h-6 text-primary mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Sem complicação
              </div>
              <div className="flex items-center text-lg text-gray-200">
                <svg className="w-6 h-6 text-primary mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Mais clientes
              </div>
              <div className="flex items-center text-lg text-gray-200">
                <svg className="w-6 h-6 text-primary mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Mais lucro
              </div>
            </div>
            <Button
              onClick={() => router.push('/auth/register')}
              size="lg"
              className="animate-bounce"
            >
              Começar agora
            </Button>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 px-4 bg-gray-900 text-white">
          <div className="max-w-6xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Escolha seu plano</h2>
            <p className="text-gray-400 text-lg">Comece hoje mesmo e transforme sua barbearia</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative bg-gray-800 rounded-xl shadow-lg p-8 border-2 ${plan.isPopular ? 'border-primary' : 'border-gray-700'}`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-black text-xs font-bold px-3 py-1 rounded-full">
                    Mais Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-4 text-center">{plan.name}</h3>
                <p className="text-gray-400 text-center mb-6">
                  {plan.id === 'monthly' && 'Perfeito para começar'}
                  {plan.id === 'quarterly' && 'Ideal para crescimento'}
                  {plan.id === 'yearly' && 'Melhor valor'
                  }
                </p>
                <div className="text-center mb-6">
                  {plan.originalPrice && (
                    <p className="text-gray-500 line-through text-lg">R$ {plan.originalPrice.toFixed(2)}</p>
                  )}
                  <p className="text-5xl font-extrabold text-primary">R$ {plan.price.toFixed(2)}</p>
                  <p className="text-gray-400 mt-2">
                    {plan.id === 'monthly' && 'por mês'}
                    {plan.id === 'quarterly' && 'por 3 meses'}
                    {plan.id === 'yearly' && 'por ano'}
                  </p>
                  {plan.originalPrice && (
                    <p className="text-green-400 text-sm mt-1">
                      Economize R$ {(plan.originalPrice - plan.price).toFixed(2)}
                    </p>
                  )}
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-300">
                      <svg className="w-5 h-5 text-primary mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() => handleCheckout(plan.priceId)}
                  disabled={loading}
                  className="w-full"
                >
                  {loading ? 'Processando...' : 'Começar agora'}
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 bg-secondary text-white">
          <div className="max-w-6xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Por que escolher o TavaresBarber?</h2>
            <p className="text-gray-400 text-lg">Recursos que vão transformar sua barbearia</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-gray-800 rounded-full flex items-center justify-center mb-6 border border-primary">
                <svg className="w-10 h-10 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17.555 17.555A8.001 8.001 0 0010 2C5.582 2 2 5.582 2 10a8.001 8.001 0 0015.555 7.555zM10 12a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Agendamento 24/7</h3>
              <p className="text-gray-400">Seus clientes podem agendar a qualquer hora, mesmo quando você está fechado</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-gray-800 rounded-full flex items-center justify-center mb-6 border border-primary">
                <svg className="w-10 h-10 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM10 12a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Dashboard Completo</h3>
              <p className="text-gray-400">Visualize todos os seus agendamentos e gerencie sua agenda de forma simples</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-gray-800 rounded-full flex items-center justify-center mb-6 border border-primary">
                <svg className="w-10 h-10 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM10 12a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Link Personalizado</h3>
              <p className="text-gray-400">Compartilhe seu link único e deixe os clientes agendarem diretamente</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gray-900 text-white text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">Pronto para revolucionar sua barbearia?</h2>
            <p className="text-gray-400 text-lg mb-8">
              Junte-se a centenas de barbeiros que já transformaram seu negócio
            </p>
            <Button
              onClick={() => router.push('/auth/register')}
              size="lg"
            >
              Começar agora
            </Button>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 bg-black text-gray-400 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} TavaresBarber. Todos os direitos reservados.</p>
        </footer>
      </div>
    </Layout>
  )
}
