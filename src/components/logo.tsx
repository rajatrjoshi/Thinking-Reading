import Image from 'next/image';

export default function Logo({className = ''}: {className: string}) {
    return (
        <div className={`${className}`}>
            <Image 
                src="/Logo.jpg" 
                alt="TR Logo"
                width={230}
                height={50}
                priority
            />
        </div>
    )
}