export const NicoLogo = ({size = 150,variant= ""}: {size: number,variant?: "" | "black"}) => {

    if(variant === "black"){
        return (
            
                <img src="/NicoLogoBlack.svg" alt="" width={size} height={size} />
            
        )
    }else{
        return (
            
                <img src="/NicoLogo.svg" alt="" width={size} height={size} />
            
        )

    }
}

