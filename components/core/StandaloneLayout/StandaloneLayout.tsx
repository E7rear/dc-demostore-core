import React, { PropsWithChildren } from 'react';
import { WithNavigationContext } from '../Masthead';
import { WithCMSTheme, WithThemesContext } from '../WithCMSTheme';
import { WithECommerceContext } from '../Masthead/ECommerceContext';

interface StandaloneLayoutProps extends PropsWithChildren {
    pageProps: {
        content: any;
        hierarchies: any;
        ecommerce: any;
    };
}

const StandaloneLayout = ({ children, pageProps }: StandaloneLayoutProps) => {
    return (
        <WithThemesContext themes={pageProps.hierarchies.themes}>
            <WithCMSTheme themes={pageProps.hierarchies.themes}>
                <WithNavigationContext pages={pageProps.hierarchies.pages} categories={pageProps.ecommerce.categories}>
                    <WithECommerceContext
                        segments={pageProps.ecommerce.segments}
                        categories={pageProps.ecommerce.categories}
                        vendor={pageProps.ecommerce.vendor}
                    >
                        <div>{children}</div>
                    </WithECommerceContext>
                </WithNavigationContext>
            </WithCMSTheme>
        </WithThemesContext>
    );
};

export default StandaloneLayout;
