package br.com.cq.dominio.dto;

import org.joda.time.DateTime;

import br.com.cq.dominio.Opcao;
import lombok.Data;

@Data
public class RespostaDTO {

	private String id;
	private String idQuestao;
	private Opcao opcao;
	private DateTime dataResposta;
	
}
