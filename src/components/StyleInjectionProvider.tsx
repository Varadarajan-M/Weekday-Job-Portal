import { StyledEngineProvider } from '@mui/material/styles';

export default function StyleInjectionProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	return <StyledEngineProvider injectFirst>{children}</StyledEngineProvider>;
}
