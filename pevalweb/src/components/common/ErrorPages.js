import { Result } from "antd";

// Composant pour gérer les erreurs internes du serveur (500)
export function Error() {
    return (
        <Result
            status="500"
            title="500"
            subTitle="Une erreur est survenue"
        />
    );
}

// Composant pour gérer les erreurs de page non trouvée (404)
export function ErrorNotFound() {
    return (
        <Result
            status="404"
            title="404"
            subTitle="Page non trouvée"
        />
    );
}
