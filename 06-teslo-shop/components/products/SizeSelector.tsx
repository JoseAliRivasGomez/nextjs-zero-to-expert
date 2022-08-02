import { FC } from 'react';
import { ISize } from '../../interfaces/products';
import { Box } from '@mui/system';
import { Button } from '@mui/material';

interface Props {
    selectedSize?: ISize;
    sizes: ISize[]
}

export const SizeSelector: FC<Props> = ({selectedSize, sizes}) => {
  return (
    <Box>
        {
            sizes.map(size => (
                <Button key={size} size='small' color={selectedSize === size ? 'info' : 'primary'} 
                    sx={{backgroundColor: selectedSize === size ? 'primary.main' : 'info.main'}}>
                    {size}
                </Button>
            ))
        }
    </Box>
  )
}
