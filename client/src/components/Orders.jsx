import { Box, Typography, Grid2 } from '@mui/material';
import { LanguageContext } from '../context/language.context';
import { useContext } from 'react';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';
import RestaurantRoundedIcon from '@mui/icons-material/RestaurantRounded';
import SmsRoundedIcon from '@mui/icons-material/SmsRounded';

function Orders() {
    const { language } = useContext(LanguageContext)

    const iconStyle = {
        fontSize: 200,
    }

    const text = [
        {en: '', pt: 'Escolha os bolos que mais lhe agradam.', 
            icon: <SearchRoundedIcon sx={iconStyle} />},
        {en: '', pt: 'Faça a sua encomenda online com, pelo menos, 48 horas de antecedência.', 
            icon: <ShoppingCartRoundedIcon sx={iconStyle} />},
        {en: '', pt: 'Efectue o pagamento por MB way ou transferência multibanco.', 
            icon: <CreditCardRoundedIcon sx={iconStyle} />},
        {en: '', pt: 'Recolha a sua encomenda na nossa morada na zona do Areeiro, em Lisboa, ou opte por entrega por Ubereats.', 
            icon: <Inventory2RoundedIcon sx={iconStyle} />},
        {en: '', pt: 'A melhor parte: disfrute dos seus bolos.', 
            icon: <RestaurantRoundedIcon sx={iconStyle} />},
        {en: '', pt: 'Partilhe o seu feedback connosco. A sua opinião é importante para nós!', 
            icon: <SmsRoundedIcon sx={iconStyle} />},
    ]

    return (
        <Box my={2}>
            <Typography variant="h4" textAlign={'center'} fontFamily={'Montserrat'} fontStyle={'italic'}>
                {language === 'en' ? 'Orders' : 'Encomendas'}
            </Typography>
            <Grid2 
                container 
                columns={3} 
                width={'80%'} 
                mx={'auto'} 
                columnSpacing={12} 
                rowSpacing={5}
            >
                {text.map(step => (
                    <Grid2 size={1}>
                        <Box sx={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            {step.icon}
                            <Typography fontSize={24}>
                                {step[language]}
                            </Typography>
                        </Box>
                    </Grid2>
                ))}
            </Grid2>
        </Box>
    )
}

export default Orders