import Image from 'next/image'
import appPreviewImg from '../assets/app-nlw-copa-preview.png'
import logoImage from '../assets/logo.svg'
import usersAvatarExampleImg from '../assets/users-avatar-example.png'
import iconCheck from '../assets/icon-check.svg'
import { api } from '../lib/axios'
import { FormEvent, useState } from 'react'

interface HomeProps {
  poolCount: number
  guessCount: number
  userCount: number
}

export default function Home(props: HomeProps) {
  const [poolTitle, setPoolTitle] = useState('')

 async function createPool(event: FormEvent){
    event.preventDefault()


    try {
     const response = await api.post('/pools', {
        title: poolTitle,
      });

      const { code } = response.data

      await navigator.clipboard.writeText(code)

      alert('Bolão criado com sucesso, o código foi copiado para a área de transferência!')
      setPoolTitle('')
    } catch (err) {
      console.log(err)
      alert('Falha ao criar o bolão')
    }

  }
  return (
    <div className='max-w-[1124px] h-screen mx-auto   grid grid-cols-2 gap-28 items-center'>
      <main>
        <Image src={logoImage} alt="NLW Copa"/>

        <h1 className='mt-14 text-white text-5xl font-bold leading-tight'>Crie seu próprio bolão da copa e compartilhe entre amigos!</h1>

        <div className='mt-10 flex gap-2 items-center'>
        <Image src={usersAvatarExampleImg} alt="Usuários de exemplo" />
        <strong className='text-gray-100 text-xl'> <span className='text-ignite-500'>{props.userCount}</span> Pessoas já estão usando</strong>
        </div>


        <form onSubmit={createPool} className='mt-10 flex gap-2 h-14'>
          <input value={poolTitle} onChange={event => setPoolTitle(event.target.value)} className=' flex-1 px-6 py-4 rounded border border-gray-600 bg-gray-800 text-sm text-gray-100' type="text" required placeholder='Qual nome do seu bolão?' />
          <button className='bg-yellow-500 hover:bg-yellow-700 px-6 py-4 rounded font-bold text-gray-900 text-sm upp' type='submit'>Criar meu bolão</button>
        </form>

        <p className='text-gray-300 text-sm mt-4 leading-relaxed'>Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas 🚀</p>

        <div className='mt-10 pt-10 border-t border-gray-600 text-gray-100 items-center flex justify-between'>
          <div className='flex items-center gap-6'>
            <Image src={iconCheck} alt="" />
            <div className='flex flex-col'>
              <span className='font-bold text-2xl text-gray-100'>{props.poolCount}</span>
              <span className='text-gray-400 leading-relaxed'>Bolões criados</span>
            </div>
          </div>

          <div className='w-px h-16 bg-gray-600' /> 

          <div className='flex items-center gap-6'>
            <Image src={iconCheck} alt="" />
            <div className='flex flex-col'>
              <span className='font-bold text-2xl text-gray-100'>{props.guessCount}</span>
              <span className='text-gray-400 leading-relaxed'>Palpites enviados</span>
            </div>
          </div>

        </div>
      </main>

      <Image src={appPreviewImg} 
        alt="Dois celulares exibindo uma prévia da aplicação móvel no NLW Copa"
        quality={100}    
      />
        
    </div>
  )
}

export const getServerSideProps = async () => {
  const [poolCountResponse, guessCountResponse, userCountResponse] =  await Promise.all([
    api.get('pools/count'),
    api.get('guesses/count'),
    api.get('users/count')

  ])
    

  return {
    props: {
      poolCount: poolCountResponse.data.count,
      guessCount: guessCountResponse.data.count,
      userCount: userCountResponse.data.count
    }
  }
  
}
