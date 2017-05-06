package crawler;

import java.util.List;
import java.util.LinkedList;

public class Tester {
	
	public static void main(String[] args){
        
		List<String> visitados = new LinkedList<String>(); 
		String h = "";
        
        Arquivo arquivo = new Arquivo("entrada.txt", "saida.txt");
        for (int i = 0; i < 9; i++) {
        	Spider spider = new Spider();
        	String aux = arquivo.lerString();
        	visitados.addAll(spider.search(aux));
        	
        	for (int j = 0; j < visitados.size(); j++) {
				h = h + visitados.get(j) + "\n\n\n";
			}
        	
            arquivo.escrever(h);

			
		}/* o metodo searche retorna uma lista contendo o html das paginas visitadas, essa lista deve ser passada ao classificador
		
		*/
        
        arquivo.fechar();
    }


}
